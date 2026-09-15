import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ProvidersModule } from '../providers/providers.module';
import { ComparisonModule } from '../comparison/comparison.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ProvidersModule, ComparisonModule, DatabaseModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
