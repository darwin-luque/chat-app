import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { PaginationOutputDto } from '../../dtos/pagination-output.dto';

export class SerializeInterceptor<D, T extends ClassConstructor<D>>
  implements NestInterceptor {
  constructor(private dto: T) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler
  ): Observable<unknown> {
    return handler.handle().pipe(
      map((data: unknown) => {
        if (data instanceof PaginationOutputDto) {
          data.items = plainToInstance(this.dto, data.items, {
            excludeExtraneousValues: true,
          });

          return data;
        }
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
