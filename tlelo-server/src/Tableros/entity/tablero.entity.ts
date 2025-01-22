import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserTable } from 'src/Tableros/entity/userTable.entity';

@Entity('tableros')
export class Tableros {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserTable, (userTable) => userTable.tablero)
  usersTable: UserTable[];
}
