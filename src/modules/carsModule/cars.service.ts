import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { UploadService } from '../uploadModule/upload.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car)
        private readonly carModel: typeof Car,
        private readonly uploadService: UploadService,
    ){}

    async findOne(id: number): Promise<any> {
        try {
            const car = await this.carModel.findByPk(id);
            if(!car) throw new NotFoundException('Carro não encontrado');
            return this.stripSensitiveData(car);
        } catch (error) {
            throw new InternalServerErrorException("Erro ao buscar carro", error.message);
        }
    }

    async findAll(): Promise<Car[]> {
        return await this.carModel.findAll();
    }

    async create(image: Express.Multer.File, createCarDto: CreateCarDto): Promise<Car> {
        try {
            const fileName = await this.uploadService.uploadImage(image);
            const car = { ...createCarDto, imgName: fileName };
            return await this.carModel.create(car);
        } catch (error) {
            throw new BadRequestException('Falha ao criar carro', error.message);
        }
    }

    async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
        try {
            const existingCar = await this.carModel.findByPk(id);
            if (!existingCar) throw new BadRequestException('Carro não encontrado');
            const updatedCar = await existingCar.update(updateCarDto);
            return this.stripSensitiveData(updatedCar);
        } catch (error) {
            throw new BadRequestException('Falha ao atualizar carro', error.message);
        }
    }

    async remove(id: number): Promise<Car> {
        try {
            const carToDelete = await this.carModel.findByPk(id);
            if (!carToDelete) throw new BadRequestException('Carro não encontrado');
            await carToDelete.destroy();
            return carToDelete;
        } catch (error) {
            throw new BadRequestException('Falha ao excluir carro', error.message);
        }
    }

    private stripSensitiveData(car: Car): any {
        return { ...car.toJSON(), id: undefined, createdAt: undefined, updatedAt: undefined };
    }
}
