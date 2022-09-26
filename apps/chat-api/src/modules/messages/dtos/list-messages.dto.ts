import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationInputDto } from '@chat-app/nest-utils';
import { ESortOrder } from '@chat-app/utils';

export class ListMessagesDto extends PaginationInputDto {
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
