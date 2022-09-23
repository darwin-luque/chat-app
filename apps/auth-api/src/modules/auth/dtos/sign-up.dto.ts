import { IsString, MinLength } from 'class-validator';
import { IsPassword } from '@chat-app/nest-utils';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsPassword()
  password: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;
}
