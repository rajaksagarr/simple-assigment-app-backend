import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentContoller } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentContoller],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
})
export class CommentModule {}
