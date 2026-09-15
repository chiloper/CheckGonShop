import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search')
  async search(
    @Query('q') query?: string,
    @Query('platform') platform?: 'all' | 'shopee' | 'lazada' | 'tiktok',
    @Query('sort') sort?: 'cheapest' | 'savings' | 'rating' | 'popular',
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('refresh') refresh?: string,
  ) {
    return this.searchService.search({
      query: query || '',
      platform: platform || 'all',
      sort: sort || 'cheapest',
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      refresh: refresh === 'true' || refresh === '1',
    });
  }

  @Get('search/trending')
  getTrending() {
    return {
      keywords: this.searchService.getTrendingKeywords(),
    };
  }

  @Get('search/suggestions')
  getSuggestions(@Query('q') query?: string) {
    return {
      suggestions: this.searchService.getSuggestions(query || ''),
    };
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    const detail = await this.searchService.getProductDetail(id);
    if (!detail) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return detail;
  }

  @Get('products/:id/history')
  async getProductHistory(@Param('id') id: string) {
    const detail = await this.searchService.getProductDetail(id);
    if (!detail) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return {
      productId: id,
      priceHistory: detail.priceHistory,
    };
  }
}
