import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreatePostDto } from './createpost.dto';
import { PagesPostDto } from './pagedpost.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRespository.find();
  }

  async create(body: CreatePostDto) {
    const user = await this.dataSource.getRepository(User).findOneBy({
      id: body.userId,
    });
    return this.postRespository.save({
      ...body,
      ...{
        user,
      },
    });
  }

  async getPaged(query: PagesPostDto): Promise<Post[]> {
    return this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.userId = :userId', query)
      .orderBy('id')
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();
  }
}
