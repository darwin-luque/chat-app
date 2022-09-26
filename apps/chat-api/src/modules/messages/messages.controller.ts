import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/utils';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { CreateMessageDto } from './dtos/create-message.dto';
import { CreateMessageCommand } from './commands/create-message';

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
}
