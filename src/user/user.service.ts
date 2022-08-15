import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/common/pageParams.interface';
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
    const queryBuilder = this.dataSource
      .getRepository(User)
      .createQueryBuilder('user');

    const usersWithEmails = await queryBuilder.where('user.email = :email', { email: body.email }).getOne();
    const usersWithPhones = await queryBuilder.where('user.phone = :phone', { phone: body.phone }).getOne();
    const usersWithUsername = await queryBuilder.where('user.username = :username', { username: body.username }).getOne();
    if (usersWithEmails || usersWithPhones || usersWithUsername) {
      let baseMessage = `User with same `;
      let missingFields = '';

      if (usersWithEmails)
        missingFields += missingFields ? ', email': "email";
      if (usersWithPhones)
        missingFields += missingFields ? ', Phone number': 'Phone number';
      if (usersWithUsername)
        missingFields += missingFields ? ', Username': 'Username';
      throw new BadRequestException(baseMessage+missingFields+" already exists!");
    }
    try {
      const user = await this.userRepository.save(body);

      return {
        ok: true,
        data: user,
      }

    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getPaged(query: PagedUserDto): Promise<PagedResponse<User>> {
    const baseQuery = this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('id');

    const data = await baseQuery.offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();
    const isNextAvaible = !!(await baseQuery.offset(query.limit * (query.page - 1))
      .limit(query.limit + 1)
      .getOne())

    return {
      data,
      isNextAvaible,
      ok: true
    }
  }

  async findAll() {
    return this.userRepository.find();
  }
}
