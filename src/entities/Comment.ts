/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Article } from './Article';
import { Users } from './Users';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_comment: number;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  foto: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  content: string;

  @ManyToOne(() => Article, (article) => article.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article' })
  article: Article;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
