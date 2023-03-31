import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { BooksService } from './books.service';
import { FilterBooksDto } from './dto/filter-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  async create(@Body() bookDto: CreateBookDto) {
    return this.booksService.create(bookDto);
  }

  @Get()
  async findAll(@Query() paramiters) {
    return this.booksService.findAll(paramiters);
  }

  @Get(':bookId/details')
  async getDetails(@Param('bookId') bookId: object) {
    return this.booksService.getDetailsById(bookId);
  }

  @Get(':bookId')
  async findOne(@Param('id') bookId: string) {
    return this.booksService.findById(bookId);
  }

  @Put(':bookId')
  async update(@Param('bookId') bookId: ObjectId, @Body() bookDto: UpdateBookDto) {
    return this.booksService.update(bookId, bookDto);
  }
  async remove(@Param('bookId') bookId: string) {
    return this.booksService.delete(bookId);
  }

  @Put(':bookId/rent')
  async rent(@Query('userId') userId: string, @Param('bookId') bookId: string) {
    return this.booksService.rentBook(userId, bookId);
  }

  @Put(':bookId/return')
  async returnBook(@Param('bookId') bookId: string) {
    return this.booksService.returnBook(bookId);
  }
}