import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './createpost.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
  ) {}

  find(): Promise<Post[]> {
    return this.postRespository.find();
  }

  async create(body: CreatePostDto) {
    return this.postRespository.create(body);
  }
}
