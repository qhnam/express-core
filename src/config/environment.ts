import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  // Port server
  PORT: process.env.PORT || 3000,

  API_PREFIX: process.env.API_PREFIX,

  // DB Connection
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT) || 3306,

  // JWT
  SECRET_KEY: process.env.SECRET_KEY,
};
