import { IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre sólo puede contener letras Mayusculas y minúsculas' })
    name: string;

    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;
}