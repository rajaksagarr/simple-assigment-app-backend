import { Controller, Get } from '@nestjs/common';
import { Post } from './post.entity';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.find();
  }
}
