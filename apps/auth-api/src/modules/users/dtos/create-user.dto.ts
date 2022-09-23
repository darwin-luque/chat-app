import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { IsPassword } from '@chat-app/nest-utils';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsPassword()
  password: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName?: string;

  @IsUrl()
  @IsOptional()
  picture?: string;
}
