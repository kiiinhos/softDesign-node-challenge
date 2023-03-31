import { IsString } from 'class-validator';

export class FilterBooksDto {
  @IsString()
  search: string;
}