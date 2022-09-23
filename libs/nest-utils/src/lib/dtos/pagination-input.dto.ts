import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInputDto {
  @Transform(({ value }) => value ? parseInt(value) : 0)
  @IsNumber()
  @IsOptional()
  offset?: number;

  @Transform(({ value }) => value ? parseInt(value) : 10)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
