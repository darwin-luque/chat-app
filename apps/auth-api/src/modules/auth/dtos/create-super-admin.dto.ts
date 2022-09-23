import {
  IsBoolean,
  IsEmail,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsPassword } from '@restaurant-app/nest-utils';

export class CreateSuperAdminDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  generatePassword?: boolean;

  @ValidateIf((o: CreateSuperAdminDto) => !o.generatePassword)
  @IsPassword()
  password?: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;
}
