/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Comment } from "./Comment";
import { Msttag } from "./Msttag";
import { Users } from "./Users";

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_article: number;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    cover: string;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    content: string;

    @OneToMany(type => Comment, comment => comment.article)
    comments: Comment[];

    @ManyToOne(() => Users, (user) => user.articles, 
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: 'user' })
    user: Users;

    @ManyToMany(() => Msttag, {
        cascade: true,
      })
    @JoinTable({name: 'article_msttag'})
    msttags: Article[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}