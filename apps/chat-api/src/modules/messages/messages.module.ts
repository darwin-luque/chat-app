import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController, CqrsModule],
  providers: [],
})
export class MessagesModule {}
