import { ServerConfigService } from '@fst/server/config';
import { ServerUsersService } from '@fst/server/users';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Request } from 'express';
import { UserProfileDto } from '../dto/auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ServerConfigService, private userService: ServerUsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const secret = await this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userService.findOneById(payload?.sub);

      if (user) {
        request['user'] = this.omit(user, 'userId', 'password');
      }
    } catch (e) {
      console.log("ERROR", e);
      throw new UnauthorizedException();
    }
    return true;
  }

  pick = <T extends {}, K extends keyof T>(obj: T, ...keys: K[]) => (
    Object.fromEntries(
      keys
        .filter(key => key in obj)
        .map(key => [key, obj[key]])
    ) as Pick<T, K>
  );
   inclusivePick = <T extends {}, K extends (string | number | symbol)>(
    obj: T, ...keys: K[]
  ) => (
    Object.fromEntries(
      keys
        .map(key => [key, obj[key as unknown as keyof T]])
    ) as { [key in K]: key extends keyof T ? T[key] : undefined }
  )

  omit = <T extends {}, K extends keyof T>(
    obj: T, ...keys: K[]
  ) => (
    Object.fromEntries(
      Object.entries(obj)
        .filter(([key]) => !keys.includes(key as K))
    ) as Omit<T, K>
  )
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}