import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { CreateCommentDto } from './createcomment.dto';
import { Post } from '../post/post.entity';
import { PagedCommentDto } from './pagedcomment.dto';
import { PagedResponse } from '../common/pageParams.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRespository: Repository<Comment>,
    private dataSource: DataSource,
  ) {}

  async postComment(body: CreateCommentDto) {
    const user = await this.dataSource.getRepository(User).findOneBy({
      id: body.commenterId,
    });

    const post = await this.dataSource.getRepository(Post).findOneBy({
      id: body.postId,
    });

    const messages: string[] = [];
    if (!user) {
      messages.push('Invalid user');
    }

    if (!post) {
      messages.push('Invliad post');
    }

    if (!user || !post) {
      throw new BadRequestException(messages);
    }

    try {
      const comment = await this.commentRespository.save({
        ...body,
        ...{
          post,
          commenter: user,
        },
      });
      return {
        ok: true,
        data: comment,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async pagedComments(body: PagedCommentDto) {
    const baseQuery = this.commentRespository
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId: body.postId })
      .orderBy('id');

    const data = await baseQuery
      .offset(body.limit * (body.page - 1))
      .limit(body.limit)
      .getMany();

    const isNextAvaible = !!(await baseQuery
      .offset(body.limit * body.page)
      .limit(body.limit)
      .getOne());

    return {
      isNextAvaible,
      data,
      ok: true,
    };
  }
}
