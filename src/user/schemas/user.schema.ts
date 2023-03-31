import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required:true})
  name: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop()
  username: string;

  @Prop({required:true})
  password: string;

  @Prop()
  borrowedBooks: string[];

  @Prop({ default: 0 })
  booksRented: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
