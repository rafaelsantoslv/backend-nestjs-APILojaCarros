import { Controller, Get, Post, Body, ValidationPipe, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common'; // Importar Get do NestJS
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    async findAll() {
        return this.carsService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.carsService.findOne(Number(id))
    }
    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    async createCar(@UploadedFile() image: Express.Multer.File, @Body(ValidationPipe) createCarDto: CreateCarDto) {
        return this.carsService.create(image, createCarDto)
    }
    @Put(':id')
    async updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto){
        return await this.carsService.update(id, updateCarDto);
    }
    @Delete(':id')
    async deleteCar(@Param('id')id: string){
        return this.carsService.remove(Number(id))
    }
    
}