/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_organization: number;

    @Column()
    id_user: number;

    @Column({
        type: "varchar",
        length: 250,
        nullable: true,
    })
    name: string;

    @Column({ 
        type: "timestamp",
        nullable: true,
    })
    created_at: string;

    @Column({ 
        type: "timestamp",
        nullable: true,
    })
    updated_at: string;

    @OneToMany(() => Users, (city) => city.id_organization)
    users: Users[];
}