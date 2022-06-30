/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Organization } from "./Organization";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 250,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 250,
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
        length: 250,
    })
    password: string;

    @Column({
        type: "varchar",
        length: 250,
        enum: ["admin", "user"],
        default: "user"
    })
    role: string;

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

    @ManyToOne(() => Organization, (id_organization) => id_organization.id_organization)
    @JoinColumn({ name: 'id_organization' })
    id_organization: Organization;
}