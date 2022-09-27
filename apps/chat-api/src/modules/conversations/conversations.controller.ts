import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationOutputDto, Serialize } from '@chat-app/nest-utils';
import { ITokenPayload } from '@chat-app/types';
import { FindOrCreateConversationCommand } from './commands/find-or-create-conversation';
import { ListConversationsQuery } from './queries/list-conversations';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { FindOrCreateConversationDto } from './dto/find-or-create-conversation.dto';
import { ListConversationsDto } from './dto/list-conversations.dto';
import { ConversationDto } from './dto/conversation.dto';
import { Conversation } from '../../infrastructure/entities/conversation.entity';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @Serialize(ConversationDto)
  findOrCreate(
    @Body() body: FindOrCreateConversationDto,
    @TokenPayload() payload: ITokenPayload
  ) {
    return this.commandBus.execute(
      new FindOrCreateConversationCommand([payload.sub, body.to])
    );
  }

  @Get()
  @Serialize(ConversationDto)
  async list(
    @Query() query: ListConversationsDto,
    @TokenPayload() payload: ITokenPayload
  ): Promise<PaginationOutputDto<Conversation>> {
    const [items, total] = await this.queryBus.execute<
      ListConversationsQuery,
      [Conversation[], number]
    >(new ListConversationsQuery(query, payload.sub));

    return new PaginationOutputDto({ items, total, ...query });
  }
}
