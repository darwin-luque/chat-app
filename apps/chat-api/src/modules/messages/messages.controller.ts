import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/utils';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { ListMessagesForConversationQuery } from './queries/list-messages-for-conversation';
import { CreateMessageCommand } from './commands/create-message';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ListMessagesDto } from './dtos/list-messages.dto';

@Controller()
export class MessagesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post(':conversationId/messages')
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
  list(
    @Param('conversationId') conversationId: string,
    @Query() query: ListMessagesDto
  ) {
    return this.queryBus.execute(
      new ListMessagesForConversationQuery(conversationId, query)
    );
  }
}
