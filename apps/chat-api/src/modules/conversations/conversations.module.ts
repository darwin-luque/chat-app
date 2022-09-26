import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { ConversationsController } from './conversations.controller';

@Module({
  controllers: [ConversationsController, CqrsModule],
  providers: [...CommandHandlers],
})
export class ConversationsModule {}
