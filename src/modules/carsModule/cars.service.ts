import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './entities/carModel';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { UploadService } from '../uploadModule/upload.service';
import { LoggerService } from '../loggerModule/logger.service';
import { JwtAuthService } from '../authModule/jwt/jwt.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car)
        private readonly carModel: typeof Car,
        private readonly uploadService: UploadService,
        private readonly loggerService: LoggerService,
        private readonly jwtService: JwtAuthService
    ){}

    async CarFindOne(id: number): Promise<any> {
        try {
            this.loggerService.log(`Entrou na função CarFindOne`);
            const car = await this.carModel.findByPk(id);
            if (!car) {
                throw new NotFoundException('Carro não encontrado');
            }
            this.loggerService.log(`Carro encontrado: ${car.id} - ${car.marcaCar}`);
            return this.stripSensitiveData(car);
        } catch (error) {
            this.loggerService.error('Erro ao buscar carro', error);
            throw new BadRequestException('Erro ao buscar carro', error.message);
        }
    }

    async CarFindAll(): Promise<Car[]> {
        try {
            this.loggerService.log('Entrou na função CarFindAll');
            return await this.carModel.findAll();
        } catch (error) {
            this.loggerService.error('Erro ao buscar todos carros', error);
            throw new BadRequestException('Erro ao buscar todos carros', error.message);
        }
    }

    async CarCreate(image: Express.Multer.File, createCarDto: CreateCarDto, token: string): Promise<Car> {
        try {
            this.loggerService.log(`Entrou na função CarCreate`);
            const verificaToken = await this.jwtService.validateToken(token);
            if (!verificaToken) {
                throw new UnauthorizedException('Token Inválido');
            }
            const fileName = await this.uploadService.uploadImage(image);
            this.loggerService.log('Enviou para o serviço uploadService');
            const car = { ...createCarDto, imgName: fileName };
            const createdCar = await this.carModel.create(car);
            this.loggerService.log(`Carro criado: ${createdCar.id} - ${createdCar.marcaCar}`);
            return createdCar;
        } catch (error) {
            this.loggerService.error('Erro ao criar carro', error);
            throw new BadRequestException('Falha ao criar carro', error.message);
        }
    }

    async CarUpdate(id: string, updateCarDto: UpdateCarDto, token: string): Promise<Car> {
        try {
            this.loggerService.log('Entrou na função CarUpdate');
            const verificaToken = await this.jwtService.validateToken(token);
            if (!verificaToken) {
                throw new UnauthorizedException('Token Inválido');
            }
            const existingCar = await this.carModel.findByPk(id);
            if (!existingCar) {
                throw new NotFoundException('Carro não encontrado');
            }
            this.loggerService.log('Modificando carro no banco após verificação');
            const updatedCar = await existingCar.update(updateCarDto);
            this.loggerService.log(`Carro atualizado: ${updatedCar.id} - ${updatedCar.marcaCar}`);
            return this.stripSensitiveData(updatedCar);
        } catch (error) {
            this.loggerService.error('Erro ao atualizar carro', error);
            throw new BadRequestException('Falha ao atualizar carro', error.message);
        }
    }

    async CarRemove(id: number, token: string): Promise<Car> {
        try {
            this.loggerService.log('Entrou na função CarRemove');
            const verificaToken = await this.jwtService.validateToken(token);
            if (!verificaToken) {
                throw new UnauthorizedException('Token Inválido');
            }
            const carToDelete = await this.carModel.findByPk(id);
            if (!carToDelete) {
                throw new NotFoundException('Carro não encontrado');
            }
            await carToDelete.destroy();
            this.loggerService.log(`Carro excluído: ${carToDelete.id} - ${carToDelete.marcaCar}`);
            return carToDelete;
        } catch (error) {
            this.loggerService.error('Erro ao excluir carro', error);
            throw new BadRequestException('Falha ao excluir carro', error.message);
        }
    }

    private stripSensitiveData(car: Car): any {
        return { ...car.toJSON(), id: undefined, createdAt: undefined, updatedAt: undefined };
    }
}
