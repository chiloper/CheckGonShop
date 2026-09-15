import { Injectable } from '@nestjs/common';
import { IProductProvider } from './provider.interface';
import { PlatformOffer } from '../products/interfaces/product.interface';
import { SEED_PRODUCTS, findOrGenerateSeeds, detectCategoryContext } from './mock-catalog.data';

@Injectable()
export class LazadaService implements IProductProvider {
  readonly platformName = 'lazada' as const;

  async search(query: string): Promise<PlatformOffer[]> {
    const matchedSeeds = findOrGenerateSeeds(query);

    return matchedSeeds.map((seed, idx) => {
      const priceModifier = 0.93 + ((idx * 5) % 9) * 0.012;
      const price = Math.round((seed.basePrice * priceModifier) / 10) * 10;
      const originalPrice = Math.round((seed.basePrice * 1.18) / 10) * 10;
      const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

      const ctx = detectCategoryContext(seed.canonicalTitle);
      const shopName = seed.brand && seed.brand !== 'Generic' && seed.brand !== 'Official Brand'
        ? `${seed.brand} LazMall Flagship`
        : ctx.shopNames.lazada;

      return {
        id: `lazada-${seed.id}`,
        platform: 'lazada',
        platformProductId: `lzd_${seed.id}`,
        title: `[LazMall] ${seed.canonicalTitle}`,
        price,
        originalPrice,
        discountPercent,
        rating: 4.7 + ((idx % 4) * 0.08),
        reviewsCount: 950 + (idx * 310),
        soldCount: 2800 + (idx * 650),
        shopName,
        shopLocation: 'สมุทรปราการ',
        isOfficialShop: true,
        productUrl: `https://www.lazada.co.th/catalog/?q=${encodeURIComponent(seed.canonicalTitle)}`,
        imageUrl: seed.imageUrl,
        shippingCost: 0,
        inStock: true,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  async getProductById(id: string): Promise<PlatformOffer | null> {
    const seed = SEED_PRODUCTS.find(p => p.id === id || `lazada-${p.id}` === id);
    if (!seed) return null;
    const offers = await this.search(seed.canonicalTitle);
    return offers[0] || null;
  }
}
