/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}