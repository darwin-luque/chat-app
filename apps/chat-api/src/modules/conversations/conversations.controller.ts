import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ITokenPayload } from '@chat-app/utils';
import { TokenPayload } from '../../infrastructure/decorators/token-payload.decorator';
import { FindOrCreateConversationCommand } from './commands/find-or-create-conversation';
import { FindOrCreateConversationDto } from './dto/find-or-create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  findOrCreate(
    @Body() body: FindOrCreateConversationDto,
    @TokenPayload() payload: ITokenPayload
  ) {
    return this.commandBus.execute(
      new FindOrCreateConversationCommand([payload.sub, body.to])
    );
  }
}
