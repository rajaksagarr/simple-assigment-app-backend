import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(10, 100)
  title: string;

  @IsString()
  @Length(10, 300)
  body: string;

  @IsInt()
  @IsPositive()
  userId: number;
}
