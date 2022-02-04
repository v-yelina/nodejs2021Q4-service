import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(
    login: string,
    password: string
  ): Promise<{ token: string } | undefined> {
    const user = await this.userService.findByLogin(login);
    if (!user) return undefined;
    const isLoginRight = await bcrypt.compare(password, user.password);
    if (!isLoginRight) return undefined;
    return {
      token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }
}
