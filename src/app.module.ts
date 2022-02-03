import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import ormconfig from './common/ormconfig';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';
import { BoardModule } from './board/board.module';
import { BoardController } from './board/board.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    TaskModule,
    BoardModule,
  ],
  controllers: [AppController, UserController, TaskController, BoardController],
  providers: [AppService],
})
export class AppModule {}
