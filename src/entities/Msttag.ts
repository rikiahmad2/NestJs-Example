/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Article } from "./Article";

@Entity()
export class Msttag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_mst: number;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    name: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}