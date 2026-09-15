import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';

@Module({
  providers: [ComparisonService],
  exports: [ComparisonService],
})
export class ComparisonModule {}
