import { IsPassword } from '@chat-app/nest-utils';
import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsPassword()
  password: string;
}
