import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import ormconfig from './common/ormconfig';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, TaskModule],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService],
})
export class AppModule {}
