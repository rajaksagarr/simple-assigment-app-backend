import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { PageParams } from '../common/pageParams.interface';

export class PagedCommentDto implements PageParams {
  @IsInt()
  @Type(() => Number)
  postId: number;

  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Type(() => Number)
  @IsPositive()
  page: number;
}
