import { Expose, Type } from 'class-transformer';
import { Session } from '@chat-app/utils';
import { AccessTokenDto } from './access-token.dto';
import { UserDto } from '../../users/dtos/user.dto';

export class SessionDto implements Session {
  @Expose()
  @Type(() => AccessTokenDto)
  accessToken: AccessTokenDto;

  @Expose()
  @Type(() => UserDto)
  attributes: UserDto;
}
