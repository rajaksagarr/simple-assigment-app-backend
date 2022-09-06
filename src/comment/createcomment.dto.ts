import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(10, 1000)
  comment: string;

  @IsNumber()
  @IsPositive()
  postId: number;

  @IsNumber()
  @IsPositive()
  commenterId: number;
}
