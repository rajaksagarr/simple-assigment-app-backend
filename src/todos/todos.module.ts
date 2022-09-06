import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from './todos.enitity';
import { TodoService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class TodosModule {}
