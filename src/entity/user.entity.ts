import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class EUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  name?: string;

  @Column('varchar', { length: 50 })
  login?: string;

  @Column('varchar', { length: 50 })
  password?: string;
}
