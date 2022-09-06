import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { PageParams } from '../common/pageParams.interface';

export class PagedUserDto implements PageParams {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;
}
