import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import ormconfig from './common/ormconfig';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';
import { BoardModule } from './board/board.module';
import { BoardController } from './board/board.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    TaskModule,
    BoardModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    // UserController,
    // TaskController,
    // BoardController,
    // AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
