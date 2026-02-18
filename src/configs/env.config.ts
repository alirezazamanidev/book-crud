import { registerAs } from '@nestjs/config';

const AppConfig = registerAs('App', () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
}));
const DbConfig = registerAs('Db', () => ({
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  host: process.env.DB_HOST ?? 'localhost',
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  name: process.env.DB_NAME ?? 'crud',
}));

export const configurations=[DbConfig,AppConfig];