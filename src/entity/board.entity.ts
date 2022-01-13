import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EColumn } from './column.entity';

@Entity('Boards')
export class EBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Column, (column) => column.board)
  columns: EColumn[];
}
