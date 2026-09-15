import { Injectable, Logger } from '@nestjs/common';
import { ShopeeService } from '../providers/shopee.service';
import { LazadaService } from '../providers/lazada.service';
import { TiktokService } from '../providers/tiktok.service';
import { ScraperApiService } from '../providers/scraper-api.service';
import { ComparisonService } from '../comparison/comparison.service';
import { ProductRepositoryService } from '../database/product-repository.service';
import {
  SearchResultResponse,
  ComparedProductGroup,
  ProductDetailResponse,
  PlatformOffer,
} from '../products/interfaces/product.interface';
import { SEED_PRODUCTS } from '../providers/mock-catalog.data';

export interface SearchFilterOptions {
  query?: string;
  platform?: 'all' | 'shopee' | 'lazada' | 'tiktok';
  sort?: 'cheapest' | 'savings' | 'rating' | 'popular';
  minPrice?: number;
  maxPrice?: number;
  refresh?: boolean;
  limit?: number;
}

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  // In-memory cache for fast search responses (TTL: 30 minutes)
  private readonly cache = new Map<string, { timestamp: number; data: SearchResultResponse }>();
  private readonly CACHE_TTL_MS = 30 * 60 * 1000;

  constructor(
    private readonly shopeeService: ShopeeService,
    private readonly lazadaService: LazadaService,
    private readonly tiktokService: TiktokService,
    private readonly scraperApiService: ScraperApiService,
    private readonly comparisonService: ComparisonService,
    private readonly productRepo: ProductRepositoryService,
  ) {}

  async search(options: SearchFilterOptions): Promise<SearchResultResponse> {
    const rawQuery = (options.query || '').trim();
    const platform = options.platform || 'all';
    const sort = options.sort || 'cheapest';
    const limit = options.limit !== undefined ? Math.max(1, options.limit) : 10;
    const cacheKey = `${rawQuery.toLowerCase()}_${platform}_${sort}_${options.minPrice || 0}_${options.maxPrice || 0}_limit${limit}`;

    // Check cache unless refresh was explicitly requested
    if (!options.refresh) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
        this.logger.log(`Serving cached price results for "${rawQuery}"`);
        return cached.data;
      }
    } else {
      this.logger.log(`Force refreshing live prices for "${rawQuery}"`);
    }

    this.logger.log(`Fetching latest prices for: "${rawQuery}" on platform: "${platform}"`);

    let comparedGroups: ComparedProductGroup[] = [];

    // Attempt 1: Fetch live products from ScraperAPI
    const liveResult = await this.scraperApiService.searchLive(rawQuery);

    if (liveResult.groups && liveResult.groups.length > 0) {
      this.logger.log(
        `[Live Scraper] Using ${liveResult.groups.length} live products for "${rawQuery}"`,
      );
      comparedGroups = liveResult.groups;

      // If user filtered by specific platform, filter offers within groups
      if (platform !== 'all') {
        comparedGroups = comparedGroups
          .map((g) => ({
            ...g,
            offers: g.offers.filter((o) => o.platform === platform),
            cheapestOffer:
              g.offers.find((o) => o.platform === platform) || g.cheapestOffer,
          }))
          .filter((g) => g.offers.length > 0);
      }
    } else {
      // Attempt 2: Fallback to internal catalog / seed generator if ScraperAPI returns empty or hits quota
      this.logger.warn(
        `[Fallback] ScraperAPI yielded no products, falling back to multi-provider catalog for: "${rawQuery}"`,
      );

      const promises: Promise<PlatformOffer[]>[] = [];

      if (platform === 'all' || platform === 'shopee') {
        promises.push(this.shopeeService.search(rawQuery));
      }
      if (platform === 'all' || platform === 'lazada') {
        promises.push(this.lazadaService.search(rawQuery));
      }
      if (platform === 'all' || platform === 'tiktok') {
        promises.push(this.tiktokService.search(rawQuery));
      }

      const results = await Promise.all(promises);
      const combinedOffers = results.flat();
      comparedGroups = this.comparisonService.groupAndCompare(combinedOffers);
    }

    // Filter by price range
    if (options.minPrice !== undefined) {
      comparedGroups = comparedGroups.filter(g => g.lowestPrice >= (options.minPrice as number));
    }
    if (options.maxPrice !== undefined) {
      comparedGroups = comparedGroups.filter(g => g.lowestPrice <= (options.maxPrice as number));
    }

    // Apply sorting
    switch (sort) {
      case 'cheapest':
        comparedGroups.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case 'savings':
        comparedGroups.sort((a, b) => b.savingsPercent - a.savingsPercent);
        break;
      case 'rating':
        comparedGroups.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'popular':
        comparedGroups.sort((a, b) => b.totalSoldCount - a.totalSoldCount);
        break;
      default:
        comparedGroups.sort((a, b) => a.lowestPrice - b.lowestPrice);
    }

    const primaryProduct = comparedGroups[0];
    const similarProducts = primaryProduct
      ? this.comparisonService.findSimilarProducts(primaryProduct, comparedGroups)
      : [];

    const response: SearchResultResponse = {
      query: rawQuery,
      totalFound: comparedGroups.length,
      cheapestDeal: primaryProduct,
      products: comparedGroups,
      similarProducts,
      trendingKeywords: this.getTrendingKeywords(),
    };

    // Store in cache
    this.cache.set(cacheKey, {
      timestamp: Date.now(),
      data: response,
    });

    // Asynchronously persist and update products in MongoDB Atlas
    Promise.all(
      comparedGroups.map(async (p) => {
        const existing = await this.productRepo.getProduct(p.id);
        let history = existing?.priceHistory || [];

        // If no history exists, generate baseline
        if (!history || history.length === 0) {
          history = this.comparisonService.generatePriceHistory(p);
        } else {
          // Append today's updated price point
          const today = new Date().toISOString().split('T')[0];
          const shopee = p.offers.find(o => o.platform === 'shopee')?.price;
          const lazada = p.offers.find(o => o.platform === 'lazada')?.price;
          const tiktok = p.offers.find(o => o.platform === 'tiktok')?.price;

          const lastPoint = history[history.length - 1];
          if (lastPoint && lastPoint.date === today) {
            lastPoint.shopeePrice = shopee;
            lastPoint.lazadaPrice = lazada;
            lastPoint.tiktokPrice = tiktok;
          } else {
            history.push({
              date: today,
              shopeePrice: shopee,
              lazadaPrice: lazada,
              tiktokPrice: tiktok,
            });
          }
        }

        return this.productRepo.saveOrUpdateProduct(p, history);
      }),
    ).catch(err => this.logger.warn(`Background Mongo save notice: ${err.message}`));

    return response;
  }

  async getProductDetail(productId: string): Promise<ProductDetailResponse | null> {
    const dbRecord = await this.productRepo.getProduct(productId);

    // If product exists in MongoDB Atlas, use it directly!
    if (dbRecord && dbRecord.offers && dbRecord.offers.length > 0) {
      const offers: PlatformOffer[] = dbRecord.offers;
      const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
      const cheapestOffer = sortedOffers[0];
      const lowestPrice = dbRecord.lowestPrice || cheapestOffer?.price || 0;
      const highestPrice = dbRecord.highestPrice || sortedOffers[sortedOffers.length - 1]?.price || lowestPrice;

      const product: ComparedProductGroup = {
        id: dbRecord.productId || productId,
        canonicalTitle: dbRecord.title,
        category: dbRecord.category || 'ทั่วไป',
        brand: dbRecord.brand || 'ทั่วไป',
        mainImageUrl: dbRecord.mainImageUrl || cheapestOffer?.imageUrl || '',
        offers: sortedOffers,
        cheapestOffer,
        lowestPrice,
        highestPrice,
        priceDifference: dbRecord.priceDifference ?? (highestPrice - lowestPrice),
        savingsPercent: dbRecord.savingsPercent ?? (highestPrice > 0 ? Math.round(((highestPrice - lowestPrice) / highestPrice) * 100) : 0),
        availablePlatforms: dbRecord.availablePlatforms || ['shopee', 'lazada', 'tiktok'],
        averageRating: dbRecord.averageRating || 4.8,
        totalSoldCount: dbRecord.totalSoldCount || 1200,
      };

      const priceHistory = (dbRecord.priceHistory && dbRecord.priceHistory.length > 0)
        ? dbRecord.priceHistory
        : this.comparisonService.generatePriceHistory(product);

      const similarProducts = this.comparisonService.findSimilarProducts(product, []);

      return {
        product,
        priceHistory,
        similarProducts,
      };
    }

    const seed = SEED_PRODUCTS.find(s => s.id === productId);
    const query = seed ? seed.canonicalTitle : productId;

    const searchResult = await this.search({ query, platform: 'all' });
    const product = searchResult.products.find(p => p.id === productId) || searchResult.products[0];

    if (!product) return null;

    const priceHistory = (dbRecord?.priceHistory && dbRecord.priceHistory.length > 0)
      ? dbRecord.priceHistory
      : this.comparisonService.generatePriceHistory(product);

    const similarProducts = this.comparisonService.findSimilarProducts(product, searchResult.products);

    return {
      product,
      priceHistory,
      similarProducts,
    };
  }


  getTrendingKeywords(): string[] {
    return [
      'iPhone 16 Pro Max',
      'หูฟัง Sony WH-1000XM5',
      'iPad Air M2',
      'Labubu Macaron',
      'Dyson V12',
      'AirPods Pro 2',
      'Nike Dunk Low Panda',
      'Samsung Galaxy S24 Ultra',
      'Stanley Cup 40oz',
    ];
  }

  getSuggestions(keyword: string): string[] {
    const q = (keyword || '').toLowerCase().trim();
    if (!q) return this.getTrendingKeywords().slice(0, 5);

    const matches: string[] = [];
    for (const seed of SEED_PRODUCTS) {
      if (seed.canonicalTitle.toLowerCase().includes(q) || seed.brand.toLowerCase().includes(q)) {
        matches.push(seed.canonicalTitle);
      }
      for (const kw of seed.keywords) {
        if (kw.toLowerCase().includes(q) && !matches.includes(kw)) {
          matches.push(kw);
        }
      }
    }
    return matches.slice(0, 6);
  }
}
