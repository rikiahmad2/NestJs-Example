/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_organization: number;

    @Column()
    id_user: number;

    @Column()
    name: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}