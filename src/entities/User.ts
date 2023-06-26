import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Operation } from "./Operation";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userid: number;

     @Column()
     name: string;

     @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Operation, (operation) => operation.user, { cascade: true })
    operations: Operation[];

}