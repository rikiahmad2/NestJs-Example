/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Article } from "./Article";

@Entity()
export class ArticleMsttag extends BaseEntity {
    @PrimaryGeneratedColumn()
    msttagIdMst: number;

    @PrimaryGeneratedColumn()
    articleIdArticle: number;
}