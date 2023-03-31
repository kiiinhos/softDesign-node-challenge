export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  publicationDate: Date;
  isRented?: boolean;
  rentedBy?: string;
  booksRented: number;
}