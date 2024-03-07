import { ServerConfigService } from '@fst/server/config';
import { ServerUsersService } from '@fst/server/users';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { omit } from '@fst/shared/domain';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@fst/server/shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ServerConfigService,
    private userService: ServerUsersService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // even if the api is set to @Public() we try to set the userInfo from a possibly set token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const payload = await this.jwtService.verifyAsync(token, {
          secret,
        });

        const user = await this.userService.findOneById(payload?.sub);
        if (user) {
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          request['user'] = omit(user, 'userId', 'password');
          return true; // can be extended with e.g. Roles
        }
      } catch (e) {
        // noop maybe the token is expired or the signature invalid
      }
    }

    return isPublic;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
