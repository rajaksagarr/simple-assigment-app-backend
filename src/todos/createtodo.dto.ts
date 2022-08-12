import { IsInt, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsInt()
  userId: number;
}
