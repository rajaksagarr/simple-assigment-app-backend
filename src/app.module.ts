import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Todo } from './todos/todos.enitity';
import { Post } from './post/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      entities: [User, Post, Todo, Comment],
      synchronize: true,
      database: 'testdb',
      logging: true,
    }),
    UserModule,
    PostModule,
    TodosModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
