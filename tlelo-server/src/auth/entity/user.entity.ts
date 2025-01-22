import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ImageUsers } from 'src/Images/entity/image.entity';
import { UserTable } from 'src/Tableros/entity/userTable.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => ImageUsers, (image) => image.user)
  image: ImageUsers;

  @OneToMany(() => UserTable, (userTable) => userTable.user)
  userTable: UserTable[];
}
