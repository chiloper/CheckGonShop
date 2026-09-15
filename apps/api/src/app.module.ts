import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './modules/providers/providers.module';
import { ComparisonModule } from './modules/comparison/comparison.module';
import { SearchModule } from './modules/search/search.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProvidersModule,
    ComparisonModule,
    SearchModule,
  ],
})
export class AppModule {}
