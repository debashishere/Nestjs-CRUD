import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
 
export class User {
  @PrimaryGeneratedColumn()       // auto incremented ids
  id: number;

  @Column()    // basic column
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
