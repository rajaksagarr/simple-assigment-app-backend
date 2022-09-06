import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesKeys } from '../auth/roles.decorator';
import { UsersRoles } from './users-roles.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  role: RolesKeys;

  @OneToMany(() => UsersRoles, (userRoles) => userRoles.role)
  userRoles: UsersRoles[];
}
