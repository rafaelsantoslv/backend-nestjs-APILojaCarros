import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  marcaCar: string;

  @IsNotEmpty()
  @IsString()
  modeloCar: string;

  @IsNotEmpty()
  @IsInt()
  anoCar: number;

  @IsNotEmpty()
  @IsString()
  corCar: string;

  @IsNotEmpty()
  @IsString()
  tipoCar: string;

  @IsNotEmpty()
  @IsInt()
  portasCar: number;

  @IsNotEmpty()
  @IsString()
  transmissionCar: string;

  @IsNotEmpty()
  @IsString()
  motorCar: string;

  @IsNotEmpty()
  @IsInt()
  valorCar: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  // Você não precisa incluir os campos addedAt, createdAt e updatedAt no DTO
  // Eles são gerados automaticamente pelo banco de dados ou pelo Sequelize
}
