import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { UpdateBookDto } from '../books/dto/update-book.dto';
import { User, UserDocument } from '../user/schemas/user.schema';

const MAX_BOOKS_RENTED = 3;

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) { }

  async findAll(paramiters): Promise<Book[]> {
    let conditions
    if (!paramiters) {
      conditions = {}
    }
    try {
      conditions = JSON.parse(paramiters.isRented)
    } catch (error) {
      console.log('Failed parse paramiters')
    }

    return this.bookModel.find(paramiters).exec();
  }

  async findById(bookId: string): Promise<Book> {
    return this.bookModel.findById(bookId).exec();
  }

  async getDetailsById(bookId: any): Promise<Book> {
    const book: any = await this.bookModel
      .findOne({ _id: new mongoose.Types.ObjectId(bookId) }, { ['details']: 1 })
      .exec();
    console.log(book);
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    console.log(createdBook);
    return createdBook.save();
  }

  async update(bookId: ObjectId, updateBookDto: UpdateBookDto): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.findById(bookId)
    } catch (error) {
      throw new NotFoundException('Book not found');
    }
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.isRented) {
      throw new BadRequestException('Is not possible edit a rented book');
    }

    return this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true }).exec();
  }

  async delete(bookId: string): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.findById(bookId)
    } catch (error) {
      throw new NotFoundException('Book not found');
    }
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.isRented) {
      throw new BadRequestException('Is not possible delete a rented book');
    }
    return this.bookModel.findByIdAndDelete(bookId).exec();

  }

  async rentBook(userId: string, bookId: string): Promise<void> {
    // const user = await this.userModel.findById(userId);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    // if (user.booksRented >= MAX_BOOKS_RENTED) {
    //   throw new BadRequestException('User has reached maximum number of books rented');
    // }

    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.isRented) {
      throw new BadRequestException('Book is already rented');
    }

    book.isRented = true;
    book.rentedBy = userId;
    await book.save();

    // user.booksRented += 1;
    // await user.save();

    return;
  }

  async returnBook(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.rentedBy != '6423abe2e2c539eac894f1dd') {
      throw new NotFoundException('You cant return a book you didnt rent ')
    }

    book.isRented = false;
    book.rentedBy = null;
    return book.save();
  }
}
