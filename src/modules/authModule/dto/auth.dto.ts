import { IsString, IsInt, IsDate, IsNotEmpty, IsEmail, Length } from 'class-validator';
export class AuthSignin {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(5, 50)
    password: string;

}


