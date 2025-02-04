import { join } from 'path';
import { DataSource } from 'typeorm';
import { ENV } from './environment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: ENV.DB_HOST,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  port: ENV.DB_PORT,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '../modules/**/entities/*.entity{.ts,.js}')],
  // entities: [UserEntity],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [],
});
