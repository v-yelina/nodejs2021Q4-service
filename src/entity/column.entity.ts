import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IBoard } from '../interfaces/board.interfaces';
import { EBoard } from './board.entity';

@Entity('Columns')
export class EColumn {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  order?: number;

  @ManyToOne(() => EBoard, {
    onDelete: 'CASCADE',
  })
  board?: IBoard;
}
