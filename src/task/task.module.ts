import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EUser } from '../user/user.entity';
import { TaskController } from './task.controller';
import { ETask } from './task.entity';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([ETask, EUser])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
