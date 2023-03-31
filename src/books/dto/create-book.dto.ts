import { IsNotEmpty, IsString, IsNumber, IsPositive, ValidateNested, isNotEmpty } from 'class-validator';
import { Type } from 'class-transformer'

export class Details{
  @IsNotEmpty()
  @IsString()
  publishingCompany: string;

  @IsNotEmpty()
  @IsString()
  rating: string;
}

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  publicationYear: string;

  @IsString()
  rentedBy: string;

  @IsString()
  isRented: string;

  @ValidateNested()
  @Type(() => Details ) 
  details: Details;

}