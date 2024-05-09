import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import * as fs from 'fs';
import * as path from 'path';
import { obterDataHoraAtual } from 'src/shared/utils/horas.util';

const UPLOAD_DIR = path.resolve('./','src', 'uploads');
@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car)
        private readonly carModel: typeof Car
    ){}

    async findOne(id: number): Promise<any> {
        try {
            const car = await this.carModel.findOne({where: {id}})
            if(!car) throw new NotFoundException('Carro não encontrado')
            const data = {...car.dataValues, id: undefined, createdAt: undefined, updatedAt: undefined}
            return data
        } catch (error) {
            throw new InternalServerErrorException("Erro ao buscar carro", error.message)
        }
    }

    async findAll(): Promise<Car[]> {
        return await this.carModel.findAll()
    }

    async create(image: Express.Multer.File, createCarDto: CreateCarDto): Promise<Car> {
        try {
            const dataAtual = obterDataHoraAtual()
            const fileName = `${dataAtual.toString()}-${image.originalname}`;
    
            const filePath = path.resolve(UPLOAD_DIR, fileName);
            console.log(filePath);
    
            const arquivo = await fs.promises.writeFile(filePath, image.buffer);

            const car = { ...createCarDto, imgName: fileName };
            return await this.carModel.create(car);
        } catch (error) {
            throw new BadRequestException('Falha ao criar carro', error.message);
        }
    }
    
    
    async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
        try {
            // Encontra o carro pelo ID
            const existingCar = await this.carModel.findByPk(id);
            if (!existingCar) {
                throw new BadRequestException('Carro não encontrado');
            }
            const updateCar = await existingCar.update(updateCarDto);
            const car = {...updateCar.dataValues,id: undefined, createdAt: undefined, updatedAt: undefined }
            return existingCar;
        } catch (error) {
            throw new BadRequestException('Falha ao atualizar carro', error.message);
        }
    }
    async remove(id: number): Promise<Car> {
        try {
            // Encontra o carro pelo ID
            const carToDelete = await this.carModel.findByPk(id);
            if (!carToDelete) {
                throw new BadRequestException('Carro não encontrado');
            }

            // Exclui o carro
            await carToDelete.destroy();

            return carToDelete;
        } catch (error) {
            throw new BadRequestException('Falha ao excluir carro', error.message);
        }
    }
}
