import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.commentsGiven, {
    nullable: false,
  })
  commenter: User;
}
