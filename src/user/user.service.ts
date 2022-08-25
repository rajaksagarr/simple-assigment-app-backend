import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagedResponse } from 'src/common/pageParams.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './createuser.dto';
import { PagedUserDto } from './pageduser.dto';
import { UpdateUserDto } from './updateuser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRoles } from './users-roles.entity';
import { Role } from './role.entity';

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
    const salt = bcrypt.genSaltSync(10);
    const passowrd = bcrypt.hashSync(body.password, salt);
    body.password = passowrd;
    return this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const userRepositoy = transactionalEntityManager.getRepository(User);
        const rolesRepositoy = transactionalEntityManager.getRepository(Role);
        const accessRepository =
          transactionalEntityManager.getRepository(UsersRoles);
        const user = await userRepositoy.save(body);
        if (body.access_roles) {
          const userRoles = await Promise.all(
            body.access_roles.map(async (role) => {
              const roleCol = await rolesRepositoy.findOne({
                where: {
                  role,
                },
              });
              const accessRole = new UsersRoles();
              accessRole.role = roleCol;
              accessRole.user = user;
              return accessRole;
            }),
          );
          await accessRepository.save(userRoles);
        }
        return {
          ok: true,
          data: user,
        };
      },
    );
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

  async findUserByUserNameOrEmail(usernameEmail: string) {
    return await this.userRepository.findOne({
      where: [
        {
          username: usernameEmail,
        },
        {
          email: usernameEmail,
        },
      ],
    });
  }
}
