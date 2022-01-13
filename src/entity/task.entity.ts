import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export class ETask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column()
  userId: string | null;

  @Column()
  boardId: string | null;

  @Column()
  columnId: string | null;
}
