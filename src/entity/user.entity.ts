import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class EUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column()
  login?: string;

  @Column()
  password?: string;
}
