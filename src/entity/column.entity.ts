import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EBoard } from './board.entity';

@Entity('Columns')
export class EColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { cascade: true })
  @JoinColumn({ name: 'board_column' })
  board: EBoard;
}
