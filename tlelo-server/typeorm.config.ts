import { config } from 'dotenv';
import { User } from 'src/auth/entity/user.entity';
import { ImageUsers } from 'src/Images/entity/image.entity';
import { Tableros } from 'src/Tableros/entity/tablero.entity';
import { UserTable } from 'src/Tableros/entity/userTable.entity';
import { Todo } from 'src/Todo/entity/todo.entity';
import { DataSource } from 'typeorm';

config();

const data = new DataSource({
  type: 'mysql',
  host: process.env.HOST_MYSQL,
  port: Number.parseInt(process.env.PORT_MYSQL),
  username: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATABASE_MYSQL,
  entities: [User, Tableros, UserTable, ImageUsers],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});

console.log(data.options.entities);

export default data;
