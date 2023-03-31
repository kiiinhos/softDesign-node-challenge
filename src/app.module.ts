import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AppGateway } from './app.gateway';
import { UsersModule } from './user/users.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kiinhos:books123123@books.9sgbkm7.mongodb.net/?retryWrites=true&w=majority'),
    AuthModule,
    BooksModule,
    AppGateway,
    UsersModule,

  ],
})
export class AppModule {}
