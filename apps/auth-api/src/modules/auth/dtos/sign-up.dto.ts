import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsPassword } from '@restaurant-app/nest-utils';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;
}
