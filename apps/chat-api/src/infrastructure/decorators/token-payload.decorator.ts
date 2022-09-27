import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiRequest, ITokenPayload } from '@chat-app/types';

export const TokenPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext): ITokenPayload => {
    const req = context.switchToHttp().getRequest() as ApiRequest;

    return req.user;
  }
);
