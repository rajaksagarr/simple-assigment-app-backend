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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRoles } from './user/users-roles.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guards';
import { Role } from './user/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [UsersRoles, Role, User, Todo, Post, Comment],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
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
