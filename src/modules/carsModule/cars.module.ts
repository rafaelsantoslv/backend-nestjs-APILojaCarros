import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service'; // Importe o CarsService
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { UploadService } from '../uploadModule/upload.service';


@Module({
  imports: [
    SequelizeModule.forFeature([Car]),
    
  ],
  controllers: [CarsController], // Declare o controlador
  providers: [CarsService, UploadService], // Declare o serviço
  exports: [CarsService]
})
export class CarsModule {}
