import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/createuser.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findUserByUserNameOrEmail(username);
    if (!user) return undefined;
    return bcrypt.compareSync(password, user.password) ? user : undefined;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      expiresIn: '7 days',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
