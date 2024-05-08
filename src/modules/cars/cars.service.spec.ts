import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from 'src/entities/carModel';
import { CreateCarDto } from './dto/cars-create.dto';
import { UpdateCarDto } from './dto/cars-update.dto';

// Mock do modeloCar de carro
const carModelMock = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: Car,
          useValue: carModelMock,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('deve encontrar e retornar um carro', async () => {
      const mockCarro = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla' };
      carModelMock.findOne.mockResolvedValue(mockCarro);

      const resultado = await service.findOne(1);

      expect(resultado).toEqual(expect.objectContaining(mockCarro));
    });

    it('deve lançar NotFoundException quando o carro não for encontrado', async () => {
      carModelMock.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrowError(NotFoundException);
    });

    it('deve lançar InternalServerErrorException em caso de erro', async () => {
      carModelMock.findOne.mockRejectedValue(new Error('Erro de banco de dados'));

      await expect(service.findOne(1)).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de carros', async () => {
      const mockCarros = [{ id: 1, marca: 'Toyota', modeloCar: 'Corolla' }, { id: 2, marca: 'Honda', modeloCar: 'Civic' }];
      carModelMock.findAll.mockResolvedValue(mockCarros);

      const resultado = await service.findAll();

      expect(resultado).toEqual(mockCarros);
    });
  });

  describe('create', () => {
    it('deve criar um novo carro', async () => {
      const novoCarro: CreateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroCriado = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla' };
      carModelMock.create.mockResolvedValue(carroCriado);

      const resultado = await service.create(novoCarro);

      expect(resultado).toEqual(carroCriado);
    });

    it('deve lançar BadRequestException em caso de falha na criação', async () => {
      const novoCarro: CreateCarDto = {marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000};
      carModelMock.create.mockRejectedValue(new Error('Erro de criação'));

      await expect(service.create(novoCarro)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('update', () => {
    it('deve atualizar um carro existente', async () => {
      const id = '1';
      const updateCarro: UpdateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroExistente = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroAtualizado = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 300000 };
      carModelMock.findByPk.mockResolvedValue(carroExistente);
      carModelMock.update.mockResolvedValue([1, [carroAtualizado]]);

      const resultado = await service.update(id, updateCarro);

      expect(resultado).toEqual(carroExistente);
    });

    it('deve lançar BadRequestException quando o carro não for encontrado para atualização', async () => {
      const id = '999';
      const updateCarro: UpdateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      carModelMock.findByPk.mockResolvedValue(null);

      await expect(service.update(id, updateCarro)).rejects.toThrowError(BadRequestException);
    });

    it('deve lançar BadRequestException em caso de falha na atualização', async () => {
      const id = '1';
      const updateCarro: UpdateCarDto = { marcaCar: 'Toyota', modeloCar: 'Corolla', anoCar: 2020, corCar: "Vermelho", tipoCar: "SUV", portasCar: 4, motorCar: '1.0', status: 'Reservado', transmissionCar: "Automatico", valorCar: 2000000 };
      const carroExistente = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla' };
      carModelMock.findByPk.mockResolvedValue(carroExistente);
      carModelMock.update.mockRejectedValue(new Error('Erro de atualização'));

      await expect(service.update(id, updateCarro)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('remove', () => {
    it('deve excluir um carro existente', async () => {
      const id = 1;
      const carroExistente = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla' };
      carModelMock.findByPk.mockResolvedValue(carroExistente);

      const resultado = await service.remove(id);

      expect(resultado).toEqual(carroExistente);
    });

    it('deve lançar BadRequestException quando o carro não for encontrado para exclusão', async () => {
      const id = 999;
      carModelMock.findByPk.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrowError(BadRequestException);
    });

    it('deve lançar BadRequestException em caso de falha na exclusão', async () => {
      const id = 1;
      const carroExistente = { id: 1, marcaCar: 'Toyota', modeloCar: 'Corolla' };
      carModelMock.findByPk.mockResolvedValue(carroExistente);
      carModelMock.destroy.mockRejectedValue(new Error('Erro de exclusão'));

      await expect(service.remove(id)).rejects.toThrowError(BadRequestException);
    });
  });
});
