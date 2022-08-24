import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './createcomment.dto';
import { PagedCommentDto } from './pagedcomment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentContoller {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async postComment(@Body(new ValidationPipe()) body: CreateCommentDto) {
    return this.commentService.postComment(body);
  }

  @Get('paged')
  async getPaginatedComments(
    @Query(new ValidationPipe()) body: PagedCommentDto,
  ) {
    return this.commentService.pagedComments(body);
  }
}
