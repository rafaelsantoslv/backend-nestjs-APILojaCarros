import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {User} from './entities/auth.entity'
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtAuthModule } from './jwt/jwt.module';
import { LoggerService } from '../loggerModule/logger.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtAuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LoggerService],
  exports: [AuthService]
})
export class AuthModule {}
