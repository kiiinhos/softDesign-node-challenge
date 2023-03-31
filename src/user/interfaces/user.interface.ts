import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  username?: string;
  booksRented?: number;
  borrowedBooks?: string[];
}

export interface AuthenticatedUser {
  user: Omit<User, 'password'>;
  token: string;
}
