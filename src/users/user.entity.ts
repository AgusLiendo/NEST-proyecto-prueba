import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'users'})
@Check('"email" IS NOT NULL')
@Check('"name" IS NOT NULL')

@Unique(['email'])

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;
    
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

}
