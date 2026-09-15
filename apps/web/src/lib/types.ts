export type PlatformType = 'shopee' | 'lazada' | 'tiktok';

export interface PlatformOffer {
  id: string;
  platform: PlatformType;
  platformProductId: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  shopName: string;
  shopLocation: string;
  isOfficialShop: boolean;
  productUrl: string;
  imageUrl: string;
  shippingCost: number;
  inStock: boolean;
  updatedAt: string;
}

export interface ComparedProductGroup {
  id: string;
  canonicalTitle: string;
  category: string;
  brand: string;
  mainImageUrl: string;
  offers: PlatformOffer[];
  cheapestOffer: PlatformOffer;
  highestPrice: number;
  lowestPrice: number;
  priceDifference: number;
  savingsPercent: number;
  availablePlatforms: PlatformType[];
  averageRating: number;
  totalSoldCount: number;
}

export interface SearchResultResponse {
  query: string;
  totalFound: number;
  cheapestDeal?: ComparedProductGroup;
  products: ComparedProductGroup[];
  similarProducts: ComparedProductGroup[];
  trendingKeywords: string[];
}

export interface PriceHistoryPoint {
  date: string;
  shopeePrice?: number;
  lazadaPrice?: number;
  tiktokPrice?: number;
}

export interface ProductDetailResponse {
  product: ComparedProductGroup;
  priceHistory: PriceHistoryPoint[];
  similarProducts: ComparedProductGroup[];
}
