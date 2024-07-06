import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { Organisation } from './organisation-model';



@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({type: "varchar", length:255, nullable: false})
    firstName: string

    @Column({type: "varchar", length:255, nullable: false})
    lastName: string

    @Column({type:"varchar", length: 255, unique:true, nullable:false})
    email: string

    @Column({type: "text", nullable:false})
    password: string

    @Column({type: "varchar", length:255, nullable: false})
    phone: string

    @ManyToMany(() => Organisation, (organisation) => organisation.users)
    @JoinTable()
    organisations: Organisation[]

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}