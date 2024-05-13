import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthSignin } from './dto/auth.dto';
import { JwtAuthService } from './jwt/jwt.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../loggerModule/logger.service';

@Injectable()
export class AuthService {
  constructor(
      @InjectModel(User)
      private readonly userModel: typeof User,
      private readonly jwtService: JwtAuthService,
      private readonly loggerService: LoggerService
  ){}

  async create(createAuthDto: CreateAuthDto, token: string) {
    try {
      this.loggerService.log(`Entrou na função create do AuthService`);
      const verificaToken = await this.jwtService.validateToken(token);
      if (!verificaToken) {
        throw new UnauthorizedException('Token Inválido');
      }
      
      const existingUser = await this.userModel.findOne({where:{email: createAuthDto.email}})
      if(existingUser) {
        throw new BadRequestException("O email já está sendo utilizado")
      }

      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
      const user = { ...createAuthDto, password: hashedPassword };
      const resultUser = await this.userModel.create(user);
      
      this.loggerService.log(`Usuário criado com sucesso: ${resultUser.id} - ${resultUser.email}`);
      
      return { ...resultUser.toJSON(), password: undefined };
    } catch (error) {
        this.loggerService.error('Erro ao criar usuário', error);
        throw new BadRequestException('Falha ao criar usuário', error.message);
    }
  }

  async signIn(authDto: AuthSignin) {
    try {
      this.loggerService.log(`Entrou na função signIn do AuthService`);
      const user = await this.userModel.findOne({ where: { email: authDto.email } });

      if (!user) {
        throw new BadRequestException('Email ou senha inválidos');
      }

      const isPasswordValid = await bcrypt.compare(authDto.password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Email ou senha inválido');
      }

      const token = await this.jwtService.signPayload({
        sub: user.id,
        email: user.email,
      });
      
      this.loggerService.log(`Usuário autenticado com sucesso: ${user.id} - ${user.email}`);
      
      return {
        ...user.toJSON(),
        password: undefined,
        token,
      };
    } catch (error) {
        this.loggerService.error('Erro ao autenticar usuário', error);
        throw new BadRequestException('Falha ao autenticar usuário', error.message);
    }
  }
}
