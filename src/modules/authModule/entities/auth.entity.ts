import { Table, Column, Model as SequelizeModel } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'Usuarios' }) // Definindo o nome da tabela no banco de dados
export class User extends SequelizeModel {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER })
  id: number;
  
  @Column({ allowNull: false })
  nome: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;
}
