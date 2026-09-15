import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ProductRecord, ProductRecordSchema } from './schemas/product-record.schema';
import { ProductRepositoryService } from './product-repository.service';

// Load .env from both possible locations (root or apps/api)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'apps/api/.env') });

const mongoUri = process.env.MONGODB_URI;
const logger = new Logger('DatabaseModule');

if (mongoUri) {
  logger.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
} else {
  logger.warn('MONGODB_URI not provided. Running in high-performance in-memory cache mode. (To use MongoDB, set MONGODB_URI in .env)');
}

@Module({
  imports: [
    ...(mongoUri
      ? [
          MongooseModule.forRoot(mongoUri),
          MongooseModule.forFeature([{ name: ProductRecord.name, schema: ProductRecordSchema }]),
        ]
      : []),
  ],
  providers: [ProductRepositoryService],
  exports: [ProductRepositoryService, ...(mongoUri ? [MongooseModule] : [])],
})
export class DatabaseModule {}
