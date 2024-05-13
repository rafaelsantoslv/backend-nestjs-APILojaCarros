import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/auth.entity';
import { AuthSignin } from './dto/auth.dto';
import { JwtAuthService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
      @InjectModel(User)
      private readonly userModel: typeof User,
      private readonly jwtService: JwtAuthService
  ){}

  async create(createAuthDto: CreateAuthDto, token: string) {
    try {
      const verificaToken = await this.jwtService.validateToken(token);
      if (!verificaToken) throw new UnauthorizedException('Token Inválido');
      const existingUser = await this.userModel.findOne({where:{email: createAuthDto.email}})
      if(existingUser) throw new BadRequestException("O email já está sendo utilizado")

      const user = {...createAuthDto, password: await bcrypt.hash(createAuthDto.password, 10)}
      const resultUser = await this.userModel.create(user)
      

      return {...resultUser.dataValues, password: undefined}
  } catch (error) {
      throw new BadRequestException('Falha ao criar user', error.message);
  }
  }

  async signIn(authDto: AuthSignin) {
    const user = await this.userModel.findOne({ where: { email: authDto.email } });

    if (!user) {
      throw new BadRequestException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Email ou senha inválido');
    }

    const token = await this.jwtService.signPayload({
      sub: user.dataValues.id,
      email: user.dataValues.email,
    });
    return {
      ...user.dataValues,
      password: undefined,
      token,
    };
  }
}
