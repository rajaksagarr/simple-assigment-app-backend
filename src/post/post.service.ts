import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/common/pageParams.interface';
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
    try {
      const savedEntity = await this.postRespository.save({
        ...body,
        ...{
          user,
        },
      });
      return {
        ok: true,
        data: savedEntity
      }
    } catch(Err) {
      return Err;
    }
  }

  async getPaged(query: PagesPostDto): Promise<PagedResponse<Post>> {
    const baseQuery = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.userId = :userId', query)
      .orderBy('id');

    const data = await baseQuery
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();

    const isNextAvaible = !!(baseQuery
      .offset(query.limit * (query.page - 1))
      .limit(query.limit + 1)
      .getOne());

    return {
      isNextAvaible,
      data,
      ok: true
    }
  }
}
