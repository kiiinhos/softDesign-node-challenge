import { IsNotEmpty, IsString } from 'class-validator';

export class RentBookDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  bookId: string;
}