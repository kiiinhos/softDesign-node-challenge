import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/interfaces/user.interface';
import {AuthenticatedUser} '../auth/interfaces/authenticated-user.interface'

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  const userModel: any = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: userModel,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validateUser', () => {
    it('should return null if user is not found', async () => {
      const email = 'test@example.com';
      userModel.findOne.mockReturnValueOnce(null);
      const result = await authService.validateUser(email, 'password');
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const email = 'test@example.com';
      const user: User = {
        _id: '123',
        name: 'Test User',
        email,
        password: 'password',
        username: 'testuser',
        booksRented: 0,
        borrowedBooks: [],
      };
      userModel.findOne.mockReturnValueOnce(user);
      const result = await authService.validateUser(email, 'wrongpassword');
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });

    it('should return an authenticated user object if email and password are correct', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user: User = {
        _id: '123',
        name: 'Test User',
        email,
        password,
        username: 'testuser',
        booksRented: 0,
        borrowedBooks: [],
      };
      userModel.findOne.mockReturnValueOnce(user);
      const token = 'mocktoken';
      (jwtService.sign as jest.Mock).mockReturnValueOnce(token);
      const expected: AuthenticatedUser = {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          booksRented: user.booksRented,
          borrowedBooks: user.borrowedBooks,
        },
        token,
      };
      const result = await authService.validateUser(email, password);
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user._id });
      expect(result).toEqual(expected);
    });
  });
});
