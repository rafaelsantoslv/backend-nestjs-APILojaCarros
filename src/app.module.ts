import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// UTILITARIOS
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';

// MODULOS
import { CarsModule } from './modules/carsModule/cars.module';
import { AuthModule } from './modules/authModule/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './modules/uploadModule/upload.module';




@Module({
  imports: [CarsModule, AuthModule, SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'carAPI',
  autoLoadModels: true,
  synchronize: true,
  }),MulterModule.register({dest: path.resolve(__dirname, '..', 'images', 'teste')}), UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
