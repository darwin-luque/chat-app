import { PaginationInputDto } from '@chat-app/nest-utils';
import { ESortOrder } from '@chat-app/types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ListUsersDto extends PaginationInputDto {
  @IsOptional()
  @IsEnum(ESortOrder)
  order: ESortOrder;

  @IsOptional()
  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  q: string;
}
