import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { ETask } from '../task/task.entity';

@Entity('Users')
export class EUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    // unique: true,
  })
  login!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password!: string;

  @OneToMany(() => ETask, (task) => task.userId)
  tasks!: ETask[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 8);
  }

  static responseUser(user: EUser): Partial<EUser> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
