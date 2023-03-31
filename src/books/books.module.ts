import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './schemas/book.schema';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/schemas/user.schema';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, UserService],
})
export class BooksModule {}
