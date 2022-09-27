import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { Conversation } from '../../infrastructure/entities/conversation.entity';
import { Message } from '../../infrastructure/entities/message.entity';
import { MessagesController } from './messages.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Message, Conversation])],
  controllers: [MessagesController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class MessagesModule {}
