import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAdminUser } from '@fst/shared/domain';

export const User = createParamDecorator(
  (data: keyof IAdminUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? (user ? (user as Partial<IAdminUser>)[data] : user) : user;
  }
);
