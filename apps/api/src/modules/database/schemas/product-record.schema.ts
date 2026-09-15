import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductRecordDocument = ProductRecord & Document;

@Schema({ timestamps: true })
export class ProductRecord {
  @Prop({ required: true, unique: true })
  productId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  category: string;

  @Prop()
  brand: string;

  @Prop()
  lowestPrice: number;

  @Prop()
  highestPrice: number;

  @Prop()
  priceDifference: number;

  @Prop()
  savingsPercent: number;

  @Prop()
  mainImageUrl: string;

  @Prop()
  averageRating: number;

  @Prop()
  totalSoldCount: number;

  @Prop({ type: Array })
  availablePlatforms: string[];

  @Prop({ type: Array })
  offers: any[];

  @Prop({ type: Array })
  priceHistory: { date: string; shopeePrice?: number; lazadaPrice?: number; tiktokPrice?: number }[];
}

export const ProductRecordSchema = SchemaFactory.createForClass(ProductRecord);
