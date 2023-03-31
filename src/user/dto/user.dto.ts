import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}