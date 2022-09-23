import { ITokenPayload, UserRole } from '@restaurant-app/utils';
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
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  given_name: string;

  @Expose()
  family_name: string;
}
