import { IsEmail } from 'class-validator';
import { IsPassword } from '@restaurant-app/nest-utils';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
