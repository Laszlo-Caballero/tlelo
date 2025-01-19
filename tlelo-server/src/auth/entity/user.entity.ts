import { ImageUsers } from 'src/Images/entity/image.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  @OneToOne(() => ImageUsers, (image) => image.user)
  image: ImageUsers;
}
