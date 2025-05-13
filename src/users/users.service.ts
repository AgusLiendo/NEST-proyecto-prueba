import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';


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
                throw new Error(`Usuario con id: ${id} no encontrado`);
            }
            return user;
        });
    }

    create(data: CreateUserDto): Promise<User> {
        return this.usersRepository.save(this.usersRepository.create(data));
    }

    remove(id: number): Promise<void> {
        return this.usersRepository.delete(id).then(() => {});
    }

    async update(id: number, data: Partial<CreateUserDto>): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

    Object.assign(user, data); // actualiza los campos que vengan en "data"
    return this.usersRepository.save(user);
    }
}
