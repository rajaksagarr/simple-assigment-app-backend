import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { Todo } from '../todos/todos.enitity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    // unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    // unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    // unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  street: string;

  @Column({
    nullable: true,
  })
  suite: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  zipcode: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
