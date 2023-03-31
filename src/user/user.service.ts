import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly Model: Model<User>,
  ) {}

  async rentBook(userId: string, bookId: string): Promise<User> {
    const user = await this.Model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const borrowedBooks = user.borrowedBooks || [];

    if (borrowedBooks.includes(bookId)) {
      throw new Error('Book already borrowed');
    }

    borrowedBooks.push(bookId);
    user.borrowedBooks = borrowedBooks;
    user.booksRented = borrowedBooks.length;

    return user.save();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.Model.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(payload,password): Promise<User> {
    payload.password = password
    return this.Model.create(payload);
    
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.Model.findOne({ email });
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.Model.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.Model.find().exec();
  }
}
