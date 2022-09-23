import { Expose, Type } from 'class-transformer';
import { TokenPayloadDto } from './token-payload.dto';

export class AccessTokenDto {
  @Expose()
  jwtToken: string;

  @Expose()
  @Type(() => TokenPayloadDto)
  payload: TokenPayloadDto;
}
