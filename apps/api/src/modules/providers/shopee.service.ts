import { Injectable } from '@nestjs/common';
import { IProductProvider } from './provider.interface';
import { PlatformOffer } from '../products/interfaces/product.interface';
import { SEED_PRODUCTS, findOrGenerateSeeds, detectCategoryContext } from './mock-catalog.data';

@Injectable()
export class ShopeeService implements IProductProvider {
  readonly platformName = 'shopee' as const;

  async search(query: string): Promise<PlatformOffer[]> {
    const matchedSeeds = findOrGenerateSeeds(query);

    return matchedSeeds.map((seed, idx) => {
      const priceModifier = 0.94 + ((idx * 7) % 11) * 0.01;
      const price = Math.round((seed.basePrice * priceModifier) / 10) * 10;
      const originalPrice = Math.round((seed.basePrice * 1.15) / 10) * 10;
      const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

      const ctx = detectCategoryContext(seed.canonicalTitle);
      const shopName = seed.brand && seed.brand !== 'Generic' && seed.brand !== 'Official Brand'
        ? `${seed.brand} Official Store (Shopee Mall)`
        : ctx.shopNames.shopee;

      return {
        id: `shopee-${seed.id}`,
        platform: 'shopee',
        platformProductId: `sp_${seed.id}`,
        title: `[Shopee Mall] ${seed.canonicalTitle}`,
        price,
        originalPrice,
        discountPercent,
        rating: 4.8 + ((idx % 3) * 0.1),
        reviewsCount: 1200 + (idx * 240),
        soldCount: 3400 + (idx * 890),
        shopName,
        shopLocation: 'กรุงเทพมหานคร',
        isOfficialShop: true,
        productUrl: `https://shopee.co.th/search?keyword=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 37,
        inStock: true,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  async getProductById(id: string): Promise<PlatformOffer | null> {
    const seed = SEED_PRODUCTS.find(p => p.id === id || `shopee-${p.id}` === id);
    if (!seed) return null;
    const offers = await this.search(seed.canonicalTitle);
    return offers[0] || null;
  }
}
