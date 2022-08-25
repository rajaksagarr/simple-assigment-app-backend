import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class UsersRoles {
  @ManyToOne(() => Role, (role) => role.userRoles, {
    eager: true,
  })
  role: Role;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
