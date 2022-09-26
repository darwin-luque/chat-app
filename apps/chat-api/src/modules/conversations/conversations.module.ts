import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { Conversation } from '../../infrastructure/entities/conversation.entity';
import { ConversationsController } from './conversations.controller';
import { CommandHandlers } from './commands/handlers';
import { Message } from '../../infrastructure/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation]), CqrsModule],
  controllers: [ConversationsController],
  providers: [...CommandHandlers],
})
export class ConversationsModule {}
