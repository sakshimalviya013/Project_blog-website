import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    operationid: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.operations, { eager: true })
    user: User;
}

