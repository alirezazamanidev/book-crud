import { registerAs } from '@nestjs/config';

const AppConfig = registerAs('App', () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
}));
const DbConfig = registerAs('Db', () => {
  const port = parseInt(process.env.DB_PORT ?? '5432', 10);
  const host = process.env.DB_HOST ?? 'localhost';
  const username = process.env.DB_USERNAME ?? 'postgres';
  const password = process.env.DB_PASSWORD ?? '';
  const name = process.env.DB_NAME ?? 'crud';
  const databaseUrl =
    process.env.DATABASE_URL ??
    `postgresql://${username}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
  return { port, host, username, password, name, databaseUrl };
});

export const configurations=[DbConfig,AppConfig];