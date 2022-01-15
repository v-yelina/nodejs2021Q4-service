import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IBoard } from '../interfaces/board.interfaces';
import { EColumn } from './column.entity';

@Entity('Boards')
export class EBoard {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  title?: string;

  @OneToMany(() => Column, ({ board }: { board: IBoard }) => board, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  columns?: EColumn[] | null;
}
