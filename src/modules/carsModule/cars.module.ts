import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service'; // Importe o CarsService
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { UploadService } from '../uploadModule/upload.service';
import { LoggerService } from '../loggerModule/logger.service';


@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    
  ],
  controllers: [CarsController], // Declare o controlador
  providers: [CarsService, UploadService, LoggerService], // Declare o serviço
  exports: [CarsService]
})
export class CarsModule {}
