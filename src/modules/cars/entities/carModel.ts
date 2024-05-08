import { Model, DataTypes } from 'sequelize';
import { Table, Column, Model as SequelizeModel } from 'sequelize-typescript';

@Table({ tableName: 'Cars' })
export class Car extends SequelizeModel {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER })
  id: number;

  @Column(DataTypes.STRING)
  marcaCar: string;

  @Column(DataTypes.STRING)
  modeloCar: string;

  @Column(DataTypes.INTEGER)
  anoCar: number;

  @Column(DataTypes.STRING)
  corCar: string;

  @Column(DataTypes.STRING)
  tipoCar: string;

  @Column(DataTypes.INTEGER)
  portasCar: number;

  @Column(DataTypes.STRING)
  transmissionCar: string;

  @Column(DataTypes.STRING)
  motorCar: string;

  @Column(DataTypes.INTEGER)
  valorCar: number;

  @Column(DataTypes.STRING)
  status: string;

  @Column({ allowNull: false, type: DataTypes.DATE })
  createdAt: Date;

  @Column({ allowNull: false, type: DataTypes.DATE })
  updatedAt: Date;
}
