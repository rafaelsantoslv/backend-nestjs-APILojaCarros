import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { UploadService } from '../uploadModule/upload.service';
import { LoggerService } from '../loggerModule/logger.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car)
        private readonly carModel: typeof Car,
        private readonly uploadService: UploadService,
        private readonly loggerService: LoggerService
    ){}

    async findOne(id: number): Promise<any> {
        try {
            this.loggerService.log('Entrou na função findOne')
            const car = await this.carModel.findByPk(id);
            if(!car) throw new NotFoundException('Carro não encontrado');
            this.loggerService.log(`Retornou resultado da função findOne ${car.id} ${car.marcaCar}`)
            return this.stripSensitiveData(car);
        } catch (error) {
            this.loggerService.error('Erro ao processar função findOne', error)
            throw new InternalServerErrorException("Erro ao buscar carro", error.message);
        }
    }

    async findAll(): Promise<Car[]> {
        return await this.carModel.findAll();
    }

    async create(image: Express.Multer.File, createCarDto: CreateCarDto): Promise<Car> {
        try {
            this.loggerService.log('Entrou na função CreateCar')
            const fileName = await this.uploadService.uploadImage(image);
            this.loggerService.log('Enviou para o serviço uploadService')
            const car = { ...createCarDto, imgName: fileName };
            this.loggerService.log(`Enviando para o banco novo carro = ${car.marcaCar}`)
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
