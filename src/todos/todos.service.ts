import {
  BadRequestException,
  Injectable,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTodoDto } from './createtodo.dto';
import { Todo } from './todos.enitity';
import { User } from '../user/user.entity';
import { PagedTodoDto } from './pagedtodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRespository: Repository<Todo>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRespository.find();
  }

  async create(body: CreateTodoDto) {
    const user = await this.dataSource.getRepository(User).findOneBy({
      id: body.userId,
    });
    if (!user) {
      throw new BadRequestException('Invalid User id!');
    }
    return this.todoRespository.save({
      ...body,
      ...{
        user,
        done: false,
      },
    });
  }

  async getPaged(@Query(new ValidationPipe()) query: PagedTodoDto) {
    return this.todoRespository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', query)
      .orderBy('id')
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();
  }
}
