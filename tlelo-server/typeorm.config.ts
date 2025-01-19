import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.HOST_MYSQL,
  port: Number.parseInt(process.env.PORT_MYSQL),
  username: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATABASE_MYSQL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
});
