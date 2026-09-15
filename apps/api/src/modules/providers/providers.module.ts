import { Module } from '@nestjs/common';
import { ShopeeService } from './shopee.service';
import { LazadaService } from './lazada.service';
import { TiktokService } from './tiktok.service';
import { ScraperApiService } from './scraper-api.service';

@Module({
  providers: [ShopeeService, LazadaService, TiktokService, ScraperApiService],
  exports: [ShopeeService, LazadaService, TiktokService, ScraperApiService],
})
export class ProvidersModule {}

