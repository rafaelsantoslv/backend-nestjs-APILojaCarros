import { IsString, IsInt, Min, Max, IsIn, IsNotEmpty } from 'class-validator';

export class UpdateCarDto {
    @IsNotEmpty({ message: 'A marca do carro é obrigatória' })
    @IsString({ message: 'A marca do carro deve ser uma string' })
    marcaCar: string;

    @IsNotEmpty({ message: 'O modelo do carro é obrigatório' })
    @IsString({ message: 'O modelo do carro deve ser uma string' })
    modeloCar: string;

    @IsInt({ message: 'O ano do carro deve ser um número inteiro' })
    @Min(1900, { message: 'O ano do carro deve ser maior ou igual a 1900' })
    anoCar: number;

    @IsNotEmpty({ message: 'A cor do carro é obrigatória' })
    @IsString({ message: 'A cor do carro deve ser uma string' })
    corCar: string;

    @IsNotEmpty({ message: 'O tipo do carro é obrigatório' })
    @IsString({ message: 'O tipo do carro deve ser uma string' })
    tipoCar: string;

    @IsInt({ message: 'O número de portas do carro deve ser um número inteiro' })
    @Min(2, { message: 'O número de portas do carro deve ser no mínimo 2' })
    @Max(5, { message: 'O número de portas do carro deve ser no máximo 5' })
    portasCar: number;

    @IsNotEmpty({ message: 'O tipo de transmissão do carro é obrigatório' })
    @IsIn(['manual', 'automático'], { message: 'O tipo de transmissão do carro deve ser manual ou automático' })
    transmissionCar: string;

    @IsNotEmpty({ message: 'O motor do carro é obrigatório' })
    @IsString({ message: 'O motor do carro deve ser uma string' })
    motorCar: string;

    @IsNotEmpty({ message: 'O valor do carro é obrigatório' })
    @IsInt({ message: 'O valor do carro deve ser um número inteiro' })
    valorCar: number;

    @IsNotEmpty({ message: 'O status do carro é obrigatório' })
    @IsIn(['ativo', 'inativo'], { message: 'O status do carro deve ser ativo ou inativo' })
    status: string;
}
