import { Post } from 'src/post/post.entity';
import { Todo } from 'src/todos/todos.enitity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column()
  website: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
