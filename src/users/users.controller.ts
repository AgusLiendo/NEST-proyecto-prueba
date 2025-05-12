import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() body: {name: string; email: string}): Promise<User> {
        return this.usersService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
