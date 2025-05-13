import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param ('id',ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() creatUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(creatUserDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Put(':id')
    updateFull(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }
    
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }
}
