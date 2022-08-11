import { Body, Controller, Get, Post as HTTPPost, Query } from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';
import { CreatePostDto } from './createpost.dto';
import { PagedRequest } from './PagedRequest';
import { Post } from './post.entity';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @HTTPPost()
  async create(@Body(new ValidationPipe()) body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Get('paged')
  async getPaged(@Query(new ValidationPipe()) query: PagedRequest) {
    return this.postService.getPaged(query);
  }
}
