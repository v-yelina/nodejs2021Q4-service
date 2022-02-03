import { ETask } from '../task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class EUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 50 })
  name?: string;

  @Column('varchar', { length: 50 })
  login?: string;

  @Column('varchar', { length: 100 })
  password?: string;

  @OneToMany(() => ETask, (task) => task.userId)
  tasks!: ETask[];

  static responseUser(user: EUser): Partial<EUser> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
