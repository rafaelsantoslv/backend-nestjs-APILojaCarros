import { IsString, IsInt, IsDate, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}

