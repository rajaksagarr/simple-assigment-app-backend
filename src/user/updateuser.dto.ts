import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  suit: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  @Length(6, 10)
  zipcode: string;
}
