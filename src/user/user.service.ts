import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './createuser.dto';
import { PagedUserDto } from './pageduser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(body: CreateUserDto) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: body.email })
      .orWhere('user.phone = :phone', { phone: body.phone })
      .orWhere('user.username = :username', { username: body.username })
      .getOne();
    if (user) {
      throw new BadRequestException('User already registered!');
    }

    return this.userRepository.save(body);
  }

  async getPaged(query: PagedUserDto) {
    return this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('id')
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();
  }

  async findAll() {
    return this.userRepository.find();
  }
}
