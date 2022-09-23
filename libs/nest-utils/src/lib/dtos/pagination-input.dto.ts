import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInputDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  offset!: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit!: number;
}
