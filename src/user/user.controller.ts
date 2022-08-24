import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PagedUserDto } from './pageduser.dto';
import { UpdateUserDto } from './updateuser.dto';
import { UserService } from './user.service';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
