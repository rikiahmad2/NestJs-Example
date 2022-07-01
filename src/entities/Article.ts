/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Comment } from "./Comment";
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

    @OneToOne(() => Users)
    @JoinColumn({name: 'id_user'})
    id_user: Users;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}