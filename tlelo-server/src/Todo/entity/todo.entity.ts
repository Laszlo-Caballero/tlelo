import { Tableros } from 'src/Tableros/entity/tablero.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  todoId: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ default: new Date() })
  fechaCreacion: Date;
}
