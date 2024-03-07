import { ServerUsersService } from '@fst/server/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from '@fst/shared/domain';
import { AuthResponse, SignupDto } from '@fst/server/shared';

@Injectable()
export class ServerAuthService {
  constructor(
    private usersService: ServerUsersService,
    private jwtService: JwtService
  ) {}

  async signUp(data: SignupDto): Promise<AuthResponse> {
    const userFound = await this.usersService.findOneByEmail(data.email);

    if (userFound) {
      return {
        user: null,
        access_token: null,
      };
    }
    const user = await this.usersService.createUser(data);
    const result = omit(user, 'password', 'userId');
    const payload = { sub: user.userId };
    return {
      user: result,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const result = omit(user, 'password', 'userId');
    const payload = { sub: user.userId };
    return {
      user: result,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
