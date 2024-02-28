import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtPayload } from '../../auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string | null => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user || !user.sub) {
      return null;
    }
    return user.sub;
  },
);
