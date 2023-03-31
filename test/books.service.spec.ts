import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../src/books/books.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return an array of books', async () => {
    const books = await service.findAll();
    expect(books).toBeInstanceOf(Array);
  });
});
