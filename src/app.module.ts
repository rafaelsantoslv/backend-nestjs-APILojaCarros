import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './modules/cars/cars.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
