import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../../user/createuser.dto';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../guards/roles.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) body: AuthDto, @Request() req) {
    return this.auth.login(req.user);
  }

  @Roles('Admin')
  @Post('signup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async signup(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.auth.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
