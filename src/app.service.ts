import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './user/users.module';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getDatabaseConfig() {
    return {
      uri: this.configService.get('MONGODB_URI'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
  }

  async getApplicationConfig() {
    return {
      port: this.configService.get('PORT') || 3000,
    };
  }

  async getModules() {
    const databaseConfig = await this.getDatabaseConfig();
    return [
      MongooseModule.forRootAsync({
        useFactory: () => databaseConfig,
      }),
      AuthModule,
      UsersModule,
      BooksModule,
    ];
  }

  async getAppOptions() {
    const applicationConfig = await this.getApplicationConfig();
    return {
      cors: true,
      logger: ['error'],
      port: applicationConfig.port,
    };
  }

  async getControllers() {
    return [AppController];
  }

  async getGateways() {
    return [AppGateway];
  }
}