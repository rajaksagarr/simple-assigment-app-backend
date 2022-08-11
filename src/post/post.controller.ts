import {
  Body,
  Controller,
  Get,
  Post as HTTPPost,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './createpost.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.find();
  }

  @HTTPPost()
  async create(@Body(new ValidationPipe()) body: CreatePostDto) {
    return this.postService.create(body);
  }
}
