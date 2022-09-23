import {
  PaginationOutputDto,
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  Serialize,
} from '@chat-app/nest-utils';
import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/utils';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { ListUsersDto } from './dtos/list-users.dto';
import { ListUsersQuery } from './queries/list-users';
import { User } from '../../infrastructure/entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @Serialize(UserDto)
  async list(
    @Query() query: ListUsersDto,
    @TokenPayload() payload: ITokenPayload
  ): Promise<PaginationOutputDto<User>> {
    const [users, total] = await this.queryBus.execute<
      ListUsersQuery,
      [User[], number]
    >(new ListUsersQuery(query, payload.sub));

    return new PaginationOutputDto({
      items: users,
      total,
      offset: query.offset ?? DEFAULT_OFFSET,
      limit: query.limit ?? DEFAULT_LIMIT,
      next: null,
      prev: null,
    });
  }
}
