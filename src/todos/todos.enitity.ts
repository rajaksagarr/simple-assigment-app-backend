import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  done: boolean;

  @ManyToOne(() => User, (user) => user.todos, {
    eager: true,
  })
  user: User;
}
