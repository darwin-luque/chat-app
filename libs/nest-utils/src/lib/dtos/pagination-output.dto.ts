import { IPaginationOutput } from '@chat-app/types';
import { ApiProperty } from '@nestjs/swagger';

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

  constructor(data: PaginationOutputDto<T>) {
    this.items = data.items;
    this.total = data.total;
    this.offset = data.offset;
    this.limit = data.limit;
    this.next =
      data.total > data.offset + data.limit
        ? {
            offset: data.offset + data.limit,
            limit: data.limit,
          }
        : null;

    this.prev =
      data.offset > 0
        ? {
            offset: data.offset - data.limit > 0 ? data.offset - data.limit : 0,
            limit: data.limit,
          }
        : null;
  }
}
