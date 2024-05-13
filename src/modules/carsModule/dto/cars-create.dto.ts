import { IsString, IsInt, IsDate, IsNotEmpty, IsJWT } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  marcaCar: string;

  @IsNotEmpty()
  @IsString()
  modeloCar: string;

  @IsNotEmpty()
  @IsString()
  anoCar: number;

  @IsNotEmpty()
  @IsString()
  corCar: string;

  @IsNotEmpty()
  @IsString()
  tipoCar: string;

  @IsNotEmpty()
  @IsString()
  portasCar: number;

  @IsNotEmpty()
  @IsString()
  transmissionCar: string;

  @IsNotEmpty()
  @IsString()
  motorCar: string;

  @IsNotEmpty()
  @IsString()
  valorCar: number;

  @IsNotEmpty()
  @IsString()
  status: string;
  

}
