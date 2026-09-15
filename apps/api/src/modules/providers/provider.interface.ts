import { PlatformOffer } from '../products/interfaces/product.interface';

export interface IProductProvider {
  readonly platformName: 'shopee' | 'lazada' | 'tiktok';
  search(query: string): Promise<PlatformOffer[]>;
  getProductById(id: string): Promise<PlatformOffer | null>;
}
