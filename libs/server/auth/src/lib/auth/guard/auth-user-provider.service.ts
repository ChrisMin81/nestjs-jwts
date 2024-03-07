import { ServerConfigService } from '@fst/server/config';
import { ServerUsersService } from '@fst/server/users';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppRole, IAdminUser, IProfileDto, IUser, omit } from '@fst/shared/domain';

@Injectable()
export class AuthUserProvider implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ServerConfigService,
    private userService: ServerUsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const payload = await this.jwtService.verifyAsync(token, {
          secret,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        let user: Partial<IUser> | undefined =
          await this.userService.findOneById(payload?.sub);

        if (user) {
          user = omit(user, 'password') as IProfileDto;
          user = {
            ...user,
            isAdmin: user.roles?.includes(AppRole.ADMIN_UPDATE_OWN_POST),
          } as IAdminUser;
          request['user'] = user;
        }
      } catch (e) {
        // noop maybe the token is expired or the signature invalid
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
