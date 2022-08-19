import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './createuser.dto';
import { PagedUserDto } from './pageduser.dto';
import { UpdateUserDto } from './updateuser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  async update(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('paged')
  async getPaged(@Query(new ValidationPipe()) query: PagedUserDto) {
    return this.userService.getPaged(query);
  }
}
