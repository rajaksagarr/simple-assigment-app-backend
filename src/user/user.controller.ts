import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/roles.decorator';
import { PagedUserDto } from './pageduser.dto';
import { UpdateUserDto } from './updateuser.dto';
import { UserService } from './user.service';


@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('Admin')
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
