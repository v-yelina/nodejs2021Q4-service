import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import ENV from '../common/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: ENV.JWT_SECRET_KEY,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
