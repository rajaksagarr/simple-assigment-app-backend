import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Length(3, 200)
  name: string;

  @IsInt()
  @IsPositive()
  userId: number;
}
