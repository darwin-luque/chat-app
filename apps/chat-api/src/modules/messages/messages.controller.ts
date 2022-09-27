import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationOutputDto, Serialize } from '@chat-app/nest-utils';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/types';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { ListMessagesForConversationQuery } from './queries/list-messages-for-conversation';
import { CreateMessageCommand } from './commands/create-message';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { Message } from '../../infrastructure/entities/message.entity';
import { MessageDto } from './dtos/message.dto';

@Controller()
export class MessagesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post(':conversationId/messages')
  @Serialize(MessageDto)
  create(
    @Param('conversationId') conversationId: string,
    @TokenPayload() payload: ITokenPayload,
    @Body() body: CreateMessageDto
  ) {
    return this.commandBus.execute(
      new CreateMessageCommand(body, conversationId, payload.sub)
    );
  }

  @Get(':conversationId/messages')
  @Serialize(MessageDto)
  async list(
    @Param('conversationId') conversationId: string,
    @Query() query: ListMessagesDto
  ): Promise<PaginationOutputDto<Message>> {
    const [items, total] = await this.queryBus.execute<
      ListMessagesForConversationQuery,
      [Message[], number]
    >(new ListMessagesForConversationQuery(conversationId, query));

    return new PaginationOutputDto({ items, total, ...query });
  }
}
