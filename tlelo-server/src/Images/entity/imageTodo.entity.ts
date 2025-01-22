import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageTodo {
  @PrimaryGeneratedColumn()
  imageTodoId: number;

  @Column()
  name: string;
}
