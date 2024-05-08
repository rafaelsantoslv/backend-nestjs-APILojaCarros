import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';
import { NotFoundException } from '@nestjs/common';

// Mock do serviço de carros
const carsServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: carsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de carros', async () => {
      const mockCarros = [{ id: 1, marca: 'Toyota', modelo: 'Corolla' }, { id: 2, marca: 'Honda', modelo: 'Civic' }];
      carsServiceMock.findAll.mockResolvedValue(mockCarros);

      const resultado = await controller.findAll();

      expect(resultado).toEqual(mockCarros);
    });
  });

  describe('findOne', () => {
    it('deve retornar um carro pelo ID', async () => {
      const id = '1';
      const mockCarro = { id: 1, marca: 'Toyota', modelo: 'Corolla' };
      carsServiceMock.findOne.mockResolvedValue(mockCarro);

      const resultado = await controller.findOne(id);

      expect(resultado).toEqual(mockCarro);
    });

    it('deve lançar NotFoundException quando o carro não for encontrado', async () => {
      const id = '999';
      carsServiceMock.findOne.mockResolvedValue(null);

      await expect(controller.findOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createCar', () => {
    it('deve criar um novo carro', async () => {
      const novoCarro: CreateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroCriado = { id: 1, marca: 'Toyota', modelo: 'Corolllla' };
      carsServiceMock.create.mockResolvedValue(carroCriado);

      const resultado = await controller.createCar(novoCarro);

      expect(resultado).toEqual(carroCriado);
    });
  });

  describe('updateCar', () => {
    it('deve atualizar um carro existente', async () => {
      const id = '1';
      const updateCarro: UpdateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroAtualizado = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 300000 };
      carsServiceMock.update.mockResolvedValue(carroAtualizado);

      const resultado = await controller.updateCar(id, updateCarro);

      expect(resultado).toEqual(carroAtualizado);
    });
  });

  describe('deleteCar', () => {
    it('deve excluir um carro existente', async () => {
      const id = '1';
      const carroRemovido = { id: 1, marca: 'Toyota', modelo: 'Corolla' };
      carsServiceMock.remove.mockResolvedValue(carroRemovido);

      const resultado = await controller.deleteCar(id);

      expect(resultado).toEqual(carroRemovido);
    });
  });
});
