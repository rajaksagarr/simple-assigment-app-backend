import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoles } from './users-roles.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRoles, Role])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
