import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/common/pageParams.interface';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './createuser.dto';
import { PagedUserDto } from './pageduser.dto';
import { UpdateUserDto } from './updateuser.dto';
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

    const usersWithEmails = await queryBuilder
      .where('user.email = :email', { email: body.email })
      .getOne();
    const usersWithPhones = await queryBuilder
      .where('user.phone = :phone', { phone: body.phone })
      .getOne();
    const usersWithUsername = await queryBuilder
      .where('user.username = :username', { username: body.username })
      .getOne();
    if (usersWithEmails || usersWithPhones || usersWithUsername) {
      const baseMessage = `User with same `;
      let missingFields = '';

      if (usersWithEmails) missingFields += missingFields ? ', email' : 'email';
      if (usersWithPhones)
        missingFields += missingFields ? ', phone number' : 'phone number';
      if (usersWithUsername)
        missingFields += missingFields ? ', username' : 'username';
      throw new BadRequestException(
        baseMessage + missingFields + ' already exists!',
      );
    }
    try {
      const user = await this.userRepository.save(body);

      return {
        ok: true,
        data: user,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getPaged(query: PagedUserDto): Promise<PagedResponse<User>> {
    const baseQuery = this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .orderBy('id');

    const data = await baseQuery
      .offset(query.limit * (query.page - 1))
      .limit(query.limit)
      .getMany();
    const isNextAvaible = !!(await baseQuery
      .offset(query.limit * query.page)
      .limit(+query.limit)
      .getOne());

    return {
      data,
      isNextAvaible,
      ok: true,
    };
  }

  async findAll() {
    return this.userRepository.find();
  }

  async updateUser(body: UpdateUserDto) {
    const queryBuilder = this.dataSource
      .getRepository(User)
      .createQueryBuilder('user');

    const usersWithEmails = body.email
      ? await queryBuilder
          .where('user.email = :email', { email: body.email })
          .andWhere('user.id != :id', { id: +body.id })
          .getOne()
      : null;
    const usersWithPhones = body.phone
      ? await queryBuilder
          .where('user.phone = :phone', { phone: body.phone })
          .andWhere('user.id != :id', { id: +body.id })
          .getOne()
      : null;
    const usersWithUsername = body.username
      ? await queryBuilder
          .where('user.username = :username', { username: body.username })
          .andWhere('user.id != :id', { id: +body.id })
          .getOne()
      : null;
    if (usersWithEmails || usersWithPhones || usersWithUsername) {
      const baseMessage = `User with same `;
      let missingFields = '';

      if (usersWithEmails) missingFields += missingFields ? ', email' : 'email';
      if (usersWithPhones)
        missingFields += missingFields ? ', phone number' : 'phone number';
      if (usersWithUsername)
        missingFields += missingFields ? ', username' : 'username';
      throw new BadRequestException(
        baseMessage + missingFields + ' already exists!',
      );
    }
    const id = body.id;
    delete body.id;

    try {
      const user = await this.userRepository.update(
        {
          id: +id,
        },
        body,
      );

      return {
        ok: true,
        data: user,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
