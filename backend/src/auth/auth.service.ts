import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== password) throw new UnauthorizedException();

    const payload = { email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
    };
  }
}
