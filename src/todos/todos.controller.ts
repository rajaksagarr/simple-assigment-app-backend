import {
  Body,
  Controller,
  Get,
  Post as HTTPost,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './createtodo.dto';
import { PagedTodoDto } from './pagedtodo.dto';
import { Todo } from './todos.enitity';
import { TodoService } from './todos.service';

@Controller('todo')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @HTTPost()
  async create(@Body(new ValidationPipe()) body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get('paged')
  async getPaged(
    @Query(new ValidationPipe()) query: PagedTodoDto,
  ) {
    return this.todoService.getPaged(query);
  }
}
