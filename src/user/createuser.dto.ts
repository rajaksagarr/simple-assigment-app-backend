import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RolesKeys } from '../auth/roles.decorator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Length(5, 100)
  password: string;

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

  @IsArray()
  access_roles: RolesKeys[];
}
