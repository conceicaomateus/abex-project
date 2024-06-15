import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== password) throw new UnauthorizedException();

    const payload = { username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
    };
  }
}
