import { IPaginationOutput } from '@chat-app/types';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants';

interface IPage {
  offset: number;
  limit: number;
}

export class PaginationOutputDto<T> implements IPaginationOutput<T> {
  items: T[];
  @ApiProperty({ type: Number, description: 'Total number of items' })
  total: number;
  @ApiProperty({ type: Number, description: 'Start index' })
  offset: number;
  @ApiProperty({
    type: Number,
    description: 'Maximum threshold of items per page',
  })
  limit: number;
  @ApiProperty({
    type: Object,
    description: 'Next page metadata',
  })
  next: IPage | null;
  @ApiProperty({
    type: Object,
    description: 'Previous page metadata',
  })
  prev: IPage | null;

  constructor(data: Partial<PaginationOutputDto<T>>) {
    const items = data.items ?? [];
    const total = data.total ?? 0;
    const offset = data.offset ?? DEFAULT_OFFSET;
    const limit = data.limit ?? DEFAULT_LIMIT;
    const diff = offset - limit;
    const sum = offset + limit;
    this.items = items;
    this.total = total;
    this.offset = offset;
    this.limit = limit;
    this.next = total > sum ? { offset: sum, limit: limit } : null;
    this.prev =
      offset > 0 ? { offset: diff > 0 ? diff : 0, limit: limit } : null;
  }
}
