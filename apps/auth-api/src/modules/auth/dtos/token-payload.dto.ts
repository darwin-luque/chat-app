import { ITokenPayload } from '@chat-app/utils';
import { Expose } from 'class-transformer';

export class TokenPayloadDto implements ITokenPayload {
  @Expose()
  aud: string;

  @Expose()
  iss: string;

  @Expose()
  iat: number;

  @Expose()
  exp: number;

  @Expose()
  sub: string;

  @Expose()
  username: string;

  @Expose()
  picture?: string;

  @Expose()
  given_name: string;

  @Expose()
  family_name: string;
}
