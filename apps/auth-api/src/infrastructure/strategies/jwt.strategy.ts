import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ITokenPayload } from '@chat-app/utils';
import { Injectable } from '@nestjs/common';
import { jwtconfig } from '../../config/jwt/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtconfig.secret,
    });
  }

  async validate(payload: ITokenPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
