import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentProvider } from './comment.provider';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentProvider],
})
export class CommentModule {}
