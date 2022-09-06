import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { PageParams } from '../common/pageParams.interface';

export class PagesPostDto implements PageParams {
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;
}
