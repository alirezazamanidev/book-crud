import { registerAs } from '@nestjs/config';

const AppConfig=registerAs('App',()=>({
    port:process.env.PORT
}))
const DbConfig = registerAs('Db', () => ({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));

export const configurations=[DbConfig,AppConfig];