import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tableros } from 'src/Tableros/entity/tablero.entity';
import { User } from 'src/auth/entity/user.entity';

@Entity('user_table')
export class UserTable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tableros, (tablero) => tablero.usersTable)
  tablero: Tableros;

  @ManyToOne(() => User, (user) => user.userTable)
  user: User;
}
