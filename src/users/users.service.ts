import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers() {
        return ['Agustin', 'Elias', 'Fumero'];
    }
}
