import { ServerUsersService } from '@fst/server/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ServerAuthService {
    constructor(
        private usersService: ServerUsersService,
        private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, userId, ...result } = user;
        const payload = { sub: user.userId };
        return {
            user: result,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
