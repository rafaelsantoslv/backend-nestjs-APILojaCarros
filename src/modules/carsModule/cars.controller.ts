import { Controller, Get, Post, Body, ValidationPipe, Param, Put, Delete, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    async findAll() {
        return this.carsService.CarFindAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.carsService.CarFindOne(Number(id));
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image'))
    async createCar(
        @UploadedFile() image: Express.Multer.File,
        @Body(ValidationPipe) createCarDto: CreateCarDto,
        @Headers('authorization') token: string
    ) {
        return this.carsService.CarCreate(image, createCarDto, token);
    }

    @Put(':id')
    async updateCar(
        @Param('id') id: string,
        @Body() updateCarDto: UpdateCarDto,
        @Headers('authorization') token: string
    ) {
        return this.carsService.CarUpdate(id, updateCarDto, token);
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: string, @Headers('authorization') token: string) {
        return this.carsService.CarRemove(Number(id), token);
    }
}
