import { PaginationOutputDto, Serialize } from '@chat-app/nest-utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/types';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { ListUsersDto } from './dtos/list-users.dto';
import { ListUsersQuery } from './queries/list-users';
import { User } from '../../infrastructure/entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { UpdateUserCommand } from './commands/update-user';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserCommand } from './commands/delete-user';
import { GetUserByIdQuery } from './queries/get-user-by-id';

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
    const [items, total] = await this.queryBus.execute<
      ListUsersQuery,
      [User[], number]
    >(new ListUsersQuery(query, payload.sub));

    return new PaginationOutputDto({ items, total, ...query });
  }

  @Get(':id')
  @Serialize(UserDto)
  async get(@Param('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Patch()
  @Serialize(UserDto)
  update(
    @Body() body: UpdateUserDto,
    @TokenPayload() payload: ITokenPayload
  ): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(payload.sub, body));
  }

  @Delete()
  @Serialize(UserDto)
  delete(@TokenPayload() payload: ITokenPayload): Promise<User> {
    return this.commandBus.execute(new DeleteUserCommand(payload.sub));
  }
}
