import { join } from 'path';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '../modules/**/entities/*.entity{.ts,.js}')],
  // entities: [UserEntity],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [],
});
