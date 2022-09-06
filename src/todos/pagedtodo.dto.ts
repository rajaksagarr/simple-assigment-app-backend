import { Type } from 'class-transformer';
import { IsIn, IsInt, isPositive, IsPositive } from 'class-validator';
import { PageParams } from '../common/pageParams.interface';

export class PagedTodoDto implements PageParams {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  userId: number;
}
