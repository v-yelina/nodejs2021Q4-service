import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { EBoard } from './board.entity';
// import { EColumn } from './column.entity';
import { EUser } from '../user/user.entity';

@Entity('Tasks')
export class ETask {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  title?: string;

  @Column('integer')
  order?: number;

  @Column('text')
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  userId?: string | null;

  @Column({ type: 'varchar', nullable: true })
  boardId?: string | null;

  @Column({ type: 'varchar', nullable: true })
  columnId?: string | null;

  @ManyToOne(() => EUser, { onDelete: 'SET NULL' })
  user?: EUser;

  // @ManyToOne(() => EBoard, { onDelete: 'CASCADE' })
  // board?: IBoard;

  // @ManyToOne(() => EColumn, { onDelete: 'SET NULL' })
  // column?: EColumn[];
}
