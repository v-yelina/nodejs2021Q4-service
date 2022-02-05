import {
  ForbiddenException,
  HttpCode,
  Body,
  Controller,
  Post,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const result = await this.authService.login(
      loginDto.login,
      loginDto.password
    );
    if (!result) throw new ForbiddenException();
    return result;
  }
}
