import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EUser } from '../user/user.entity';
import { ETask } from '../task/task.entity';
import { BoardController } from './board.controller';
import { EBoard } from './board.entity';
import { BoardService } from './board.service';
import { EColumn } from './column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ETask, EUser, EBoard, EColumn])],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
