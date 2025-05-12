import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id }).then(user => {
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
        });
    }

    create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    remove(id: number): Promise<void> {
        return this.usersRepository.delete(id).then(() => {});
    }

}
