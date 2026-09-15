import { Injectable } from '@nestjs/common';
import {
  PlatformOffer,
  ComparedProductGroup,
  PlatformType,
  PriceHistoryPoint,
} from '../products/interfaces/product.interface';
import { SEED_PRODUCTS } from '../providers/mock-catalog.data';

@Injectable()
export class ComparisonService {
  /**
   * Group offers from multiple platforms by identical product identity
   */
  groupAndCompare(offers: PlatformOffer[]): ComparedProductGroup[] {
    const groupsMap = new Map<string, PlatformOffer[]>();

    for (const offer of offers) {
      // Extract normalized base ID (strip platform prefix)
      const baseKey = this.extractProductKey(offer);
      if (!groupsMap.has(baseKey)) {
        groupsMap.set(baseKey, []);
      }
      groupsMap.get(baseKey).push(offer);
    }

    const result: ComparedProductGroup[] = [];

    for (const [key, groupOffers] of groupsMap.entries()) {
      if (groupOffers.length === 0) continue;

      // Sort offers by total effective price (price + shippingCost) ascending
      const sortedOffers = [...groupOffers].sort((a, b) => (a.price + a.shippingCost) - (b.price + b.shippingCost));
      const cheapestOffer = sortedOffers[0];
      const prices = groupOffers.map(o => o.price);
      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);
      const priceDifference = highestPrice - lowestPrice;
      const savingsPercent = highestPrice > 0 ? Math.round((priceDifference / highestPrice) * 100) : 0;

      const platforms = Array.from(new Set(groupOffers.map(o => o.platform))) as PlatformType[];

      // Metadata derivation
      const canonicalTitle = this.cleanProductTitle(cheapestOffer.title);
      const seed = SEED_PRODUCTS.find(s => s.id === key);
      const category = seed?.category || 'ทั่วไป';
      const brand = seed?.brand || 'ทั่วไป';

      const avgRating = Number(
        (groupOffers.reduce((acc, o) => acc + o.rating, 0) / groupOffers.length).toFixed(1)
      );
      const totalSold = groupOffers.reduce((acc, o) => acc + o.soldCount, 0);

      result.push({
        id: key,
        canonicalTitle,
        category,
        brand,
        mainImageUrl: cheapestOffer.imageUrl,
        offers: sortedOffers,
        cheapestOffer,
        highestPrice,
        lowestPrice,
        priceDifference,
        savingsPercent,
        availablePlatforms: platforms,
        averageRating: avgRating,
        totalSoldCount: totalSold,
      });
    }

    return result;
  }

  /**
   * Find similar products for alternative comparison
   */
  findSimilarProducts(targetGroup: ComparedProductGroup, allGroups: ComparedProductGroup[]): ComparedProductGroup[] {
    if (!targetGroup) return allGroups.slice(0, 4);

    // Filter out target itself
    const candidates = allGroups.filter(g => g.id !== targetGroup.id);

    // Rank candidates by category match or brand match
    const scored = candidates.map(c => {
      let score = 0;
      if (c.category === targetGroup.category) score += 5;
      if (c.brand === targetGroup.brand) score += 3;
      // Price proximity score
      const priceRatio = Math.min(c.lowestPrice, targetGroup.lowestPrice) / Math.max(c.lowestPrice, targetGroup.lowestPrice);
      score += priceRatio * 2;
      return { group: c, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // If fewer than 3, backfill from other seeds
    const similar = scored.map(s => s.group);
    if (similar.length < 3) {
      const remainingSeeds = SEED_PRODUCTS.filter(s => s.id !== targetGroup.id && !similar.some(sm => sm.id === s.id));
      for (const extraSeed of remainingSeeds.slice(0, 4 - similar.length)) {
        similar.push(this.createGroupFromSeed(extraSeed));
      }
    }

    return similar.slice(0, 4);
  }

  /**
   * Generate realistic 30-day price history for a product across platforms
   */
  generatePriceHistory(product: ComparedProductGroup): PriceHistoryPoint[] {
    const points: PriceHistoryPoint[] = [];
    const basePrice = product.lowestPrice;
    const now = new Date();

    for (let i = 29; i >= 0; i -= 3) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      // Subtle fluctuation over time
      const variance = (Math.sin(i) * 0.04);
      const shopeeOffer = product.offers.find(o => o.platform === 'shopee');
      const lazadaOffer = product.offers.find(o => o.platform === 'lazada');
      const tiktokOffer = product.offers.find(o => o.platform === 'tiktok');

      points.push({
        date: dateStr,
        shopeePrice: shopeeOffer ? Math.round((shopeeOffer.price * (1 + variance * 0.8)) / 10) * 10 : undefined,
        lazadaPrice: lazadaOffer ? Math.round((lazadaOffer.price * (1 + variance * 1.2)) / 10) * 10 : undefined,
        tiktokPrice: tiktokOffer ? Math.round((tiktokOffer.price * (1 - variance * 0.5)) / 10) * 10 : undefined,
      });
    }

    return points;
  }

  private cleanProductTitle(title: string): string {
    return title
      .replace(/^\[(Shopee Mall|LazMall|TikTok Shop)\]\s*/i, '')
      .replace(/^(Shopee Mall|LazMall|TikTok Shop)\s*/i, '')
      .trim();
  }

  private extractProductKey(offer: PlatformOffer): string {
    if (offer.id.startsWith('shopee-')) return offer.id.replace('shopee-', '');
    if (offer.id.startsWith('lazada-')) return offer.id.replace('lazada-', '');
    if (offer.id.startsWith('tiktok-')) return offer.id.replace('tiktok-', '');
    return offer.id;
  }

  private createGroupFromSeed(seed: typeof SEED_PRODUCTS[0]): ComparedProductGroup {
    const p1 = Math.round(seed.basePrice * 0.95);
    const p2 = Math.round(seed.basePrice * 0.98);
    const p3 = seed.basePrice;

    const offers: PlatformOffer[] = [
      {
        id: `shopee-${seed.id}`,
        platform: 'shopee',
        platformProductId: `sp_${seed.id}`,
        title: seed.canonicalTitle,
        price: p1,
        originalPrice: Math.round(seed.basePrice * 1.15),
        discountPercent: 17,
        rating: 4.8,
        reviewsCount: 890,
        soldCount: 2300,
        shopName: `${seed.brand} Official Store`,
        shopLocation: 'กรุงเทพฯ',
        isOfficialShop: true,
        productUrl: `https://shopee.co.th/search?keyword=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 35,
        inStock: true,
        updatedAt: new Date().toISOString(),
      },
      {
        id: `lazada-${seed.id}`,
        platform: 'lazada',
        platformProductId: `lzd_${seed.id}`,
        title: seed.canonicalTitle,
        price: p2,
        originalPrice: Math.round(seed.basePrice * 1.15),
        discountPercent: 15,
        rating: 4.7,
        reviewsCount: 760,
        soldCount: 1800,
        shopName: `${seed.brand} LazMall`,
        shopLocation: 'สมุทรปราการ',
        isOfficialShop: true,
        productUrl: `https://www.lazada.co.th/catalog/?q=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 0,
        inStock: true,
        updatedAt: new Date().toISOString(),
      },
      {
        id: `tiktok-${seed.id}`,
        platform: 'tiktok',
        platformProductId: `tt_${seed.id}`,
        title: seed.canonicalTitle,
        price: p3,
        originalPrice: Math.round(seed.basePrice * 1.15),
        discountPercent: 13,
        rating: 4.9,
        reviewsCount: 1400,
        soldCount: 3900,
        shopName: `${seed.brand} TikTok Shop`,
        shopLocation: 'กรุงเทพฯ',
        isOfficialShop: true,
        productUrl: `https://www.tiktok.com/search?q=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 29,
        inStock: true,
        updatedAt: new Date().toISOString(),
      }
    ];

    return {
      id: seed.id,
      canonicalTitle: seed.canonicalTitle,
      category: seed.category,
      brand: seed.brand,
      mainImageUrl: seed.imageUrl,
      offers,
      cheapestOffer: offers[0],
      lowestPrice: p1,
      highestPrice: p3,
      priceDifference: p3 - p1,
      savingsPercent: Math.round(((p3 - p1) / p3) * 100),
      availablePlatforms: ['shopee', 'lazada', 'tiktok'],
      averageRating: 4.8,
      totalSoldCount: 8000,
    };
  }
}
