import { Injectable, Optional, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRecord, ProductRecordDocument } from './schemas/product-record.schema';
import { ComparedProductGroup, PriceHistoryPoint } from '../products/interfaces/product.interface';

@Injectable()
export class ProductRepositoryService {
  private readonly logger = new Logger(ProductRepositoryService.name);
  private readonly memoryStore = new Map<string, any>();

  constructor(
    @Optional()
    @InjectModel(ProductRecord.name)
    private readonly productModel?: Model<ProductRecordDocument>,
  ) {
    if (this.productModel) {
      this.logger.log('✅ ProductRepository connected to MongoDB Atlas');
    } else {
      this.logger.log('ℹ️ ProductRepository operating in In-Memory mode');
    }
  }

  async saveOrUpdateProduct(product: ComparedProductGroup, priceHistory?: PriceHistoryPoint[]): Promise<void> {
    const payload = {
      productId: product.id,
      title: product.canonicalTitle,
      category: product.category,
      brand: product.brand,
      lowestPrice: product.lowestPrice,
      highestPrice: product.highestPrice,
      priceDifference: product.priceDifference,
      savingsPercent: product.savingsPercent,
      mainImageUrl: product.mainImageUrl,
      averageRating: product.averageRating,
      totalSoldCount: product.totalSoldCount,
      availablePlatforms: product.availablePlatforms,
      offers: product.offers,
      priceHistory: priceHistory || [],
    };

    if (this.productModel) {
      try {
        await this.productModel.findOneAndUpdate(
          { productId: product.id },
          { $set: payload },
          { upsert: true, new: true },
        );
        this.logger.debug(`Saved product "${product.id}" to MongoDB Atlas`);
      } catch (err) {
        this.logger.error(`Failed to save product to MongoDB: ${err.message}`);
      }
    } else {
      this.memoryStore.set(product.id, payload);
    }
  }

  async getProduct(productId: string): Promise<any | null> {
    if (this.productModel) {
      try {
        return await this.productModel.findOne({ productId }).lean();
      } catch (err) {
        this.logger.error(`Failed to get product from MongoDB: ${err.message}`);
        return null;
      }
    }
    return this.memoryStore.get(productId) || null;
  }
}
