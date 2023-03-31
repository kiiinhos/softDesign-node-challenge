import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';


@Schema()
export class Details {
  @Prop()
  publishingCompany: string;

  @Prop()
  rating: string;

}

export type BookDocument = Book & Document;

@Schema()
export class Book {

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  publicationYear: string;

  @Prop({ default: null })
  rentedBy: string;

  @Prop({ default: false })
  isRented: boolean;

  @Prop({ type: Details })
  details: Details;
}

export const BookSchema = SchemaFactory.createForClass(Book);
