import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController, CqrsModule],
  providers: [...CommandHandlers],
})
export class MessagesModule {}
