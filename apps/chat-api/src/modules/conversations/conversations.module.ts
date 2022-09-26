import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationsController } from './conversations.controller';

@Module({
  controllers: [ConversationsController, CqrsModule],
  providers: [],
})
export class ConversationsModule {}
