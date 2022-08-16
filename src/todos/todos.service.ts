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
import { PagedResponse } from 'src/common/pageParams.interface';

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
    const data = this.todoRespository.save({
      ...body,
      ...{
        user,
        done: false,
      },
    });

    return {
      ok: true,
      data,
    };
  }

  async getPaged(
    @Query(new ValidationPipe()) query: PagedTodoDto,
  ): Promise<PagedResponse<Todo>> {
    const baseQuery = this.todoRespository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', query)
      .orderBy('id');

    const data = await baseQuery
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();

    const isNextAvaible = !!(await baseQuery
      .offset(query.limit * (query.page + 1))
      .limit(query.limit)
      .getMany());

    return {
      isNextAvaible,
      data,
      ok: true,
    };
  }
}
