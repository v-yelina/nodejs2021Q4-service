import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IBoard } from '../interfaces/board.interfaces';
import { EBoard } from './board.entity';

@Entity('Columns')
export class EColumn {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  title?: string;

  @Column('integer')
  order?: number;

  @Column('varchar')
  boardId?: string;

  @ManyToOne(() => EBoard, {
    onDelete: 'CASCADE',
  })
  board?: IBoard;
}
