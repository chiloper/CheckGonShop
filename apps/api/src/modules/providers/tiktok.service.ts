import { Injectable } from '@nestjs/common';
import { IProductProvider } from './provider.interface';
import { PlatformOffer } from '../products/interfaces/product.interface';
import { SEED_PRODUCTS, findOrGenerateSeeds, detectCategoryContext } from './mock-catalog.data';

@Injectable()
export class TiktokService implements IProductProvider {
  readonly platformName = 'tiktok' as const;

  async search(query: string): Promise<PlatformOffer[]> {
    const matchedSeeds = findOrGenerateSeeds(query);

    return matchedSeeds.map((seed, idx) => {
      const priceModifier = 0.92 + ((idx * 9) % 13) * 0.009;
      const price = Math.round((seed.basePrice * priceModifier) / 10) * 10;
      const originalPrice = Math.round((seed.basePrice * 1.20) / 10) * 10;
      const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

      const ctx = detectCategoryContext(seed.canonicalTitle);
      const shopName = seed.brand && seed.brand !== 'Generic' && seed.brand !== 'Official Brand'
        ? `${seed.brand} Authorized TikTok Shop`
        : ctx.shopNames.tiktok;

      return {
        id: `tiktok-${seed.id}`,
        platform: 'tiktok',
        platformProductId: `tt_${seed.id}`,
        title: `[TikTok Shop] ${seed.canonicalTitle}`,
        price,
        originalPrice,
        discountPercent,
        rating: 4.9,
        reviewsCount: 2100 + (idx * 400),
        soldCount: 5200 + (idx * 1100),
        shopName,
        shopLocation: 'กรุงเทพมหานคร',
        isOfficialShop: true,
        productUrl: `https://www.tiktok.com/search?q=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 29,
        inStock: true,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  async getProductById(id: string): Promise<PlatformOffer | null> {
    const seed = SEED_PRODUCTS.find(p => p.id === id || `tiktok-${p.id}` === id);
    if (!seed) return null;
    const offers = await this.search(seed.canonicalTitle);
    return offers[0] || null;
  }
}
