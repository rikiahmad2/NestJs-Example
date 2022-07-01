/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryColumn, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
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

    @ManyToOne(() => Organization, (organization) => organization.users, 
        { onDelete: "CASCADE" }
    )
    @JoinColumn({ name: 'organization' })
    organization: Organization;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}