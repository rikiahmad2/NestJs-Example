/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_organization: number;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    name: string;

    @OneToMany(() => Users, (city) => city.id_organization)
    users: Users[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}