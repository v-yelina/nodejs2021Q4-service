import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EColumn } from './column.entity';

@Entity('Boards')
export class EBoard {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  title?: string;

  @OneToMany(() => EColumn, (column) => column.boardId, {
    onDelete: 'CASCADE',
  })
  columns!: EColumn[];

  // @OneToMany(() => EColumn, (board) => board, {
  //   nullable: true,
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // columns?: EColumn[];
}
