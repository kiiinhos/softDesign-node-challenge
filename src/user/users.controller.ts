import { Controller, Get, Post, Body, Param,Query } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
      @Body() paylod: CreateUserDto,
  ): Promise<User> {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(paylod.password, saltOrRounds);
      const result = await this.userService.create(
          paylod,
          hashedPassword,
      );
      return result;
  }


  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }


  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post(':userId/books/:bookId/rent')
  async rentBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<User> {
    return this.userService.rentBook(userId, bookId);
  }
  
}
