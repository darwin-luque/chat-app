import {
  ApiRequest,
  ApiResponse,
  ITokenPayload,
  ApiNextFunction,
} from '@chat-app/utils';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SetTokenPayloadMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: ApiRequest, res: ApiResponse, next: ApiNextFunction) {
    let token = req.headers.authorization as string;
    if (!token?.startsWith('Bearer ')) {
      return next();
    }
    token = token.replace('Bearer ', '');

    if (token) {
      const payload = this.jwtService.decode(token) as ITokenPayload;
      req.user = payload;
    }
    next();
  }
}
