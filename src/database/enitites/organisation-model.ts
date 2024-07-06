import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";
import { User } from "./user-model";


@Entity()
export class Organisation {
    @PrimaryGeneratedColumn("uuid")
    orgId: string

    @Column({type:"varchar", length:255, nullable: false})
    name: string

    @Column({type:"text", nullable: true})
    description: string;

    @ManyToMany(() => User, (user) => user.organisations)
    users: User[]

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}