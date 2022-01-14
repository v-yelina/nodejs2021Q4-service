import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IBoard, IColumn } from '../interfaces/board.interfaces';
import { IUser } from '../interfaces/user.interfaces';
import { EBoard } from './board.entity';
import { EUser } from './user.entity';

@Entity('Tasks')
export class ETask {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  order?: number;

  @Column()
  description?: string;

  @Column()
  userId?: string | null;

  @Column()
  boardId?: string | null;

  @Column()
  columnId?: string | null;

  @ManyToOne(() => EUser, { onDelete: 'SET NULL' })
  user?: IUser;

  @ManyToOne(() => EBoard, { onDelete: 'CASCADE' })
  board?: IBoard;

  @ManyToOne(() => Column, { onDelete: 'SET NULL' })
  column?: IColumn;
}
