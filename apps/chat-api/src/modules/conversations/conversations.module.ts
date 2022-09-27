import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { Conversation } from '../../infrastructure/entities/conversation.entity';
import { Message } from '../../infrastructure/entities/message.entity';
import { ConversationsController } from './conversations.controller';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation]), CqrsModule],
  controllers: [ConversationsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ConversationsModule {}
