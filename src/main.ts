import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ENV from './common/config';
import { EUser } from './user/user.entity';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV.PORT as string, '0.0.0.0');
  await getRepository(EUser).insert([
    { name: 'Admin', login: 'admin', password: bcrypt.hashSync('admin', 8) },
  ]);
}
bootstrap();
