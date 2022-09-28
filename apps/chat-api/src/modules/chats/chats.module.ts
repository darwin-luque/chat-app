import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { Conversation } from '../../infrastructure/entities/conversation.entity';
import { Message } from '../../infrastructure/entities/message.entity';
import { CommandHandlers } from './commands/handlers';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Conversation, Message])],
  providers: [ChatsGateway, ...CommandHandlers],
})
export class ChatsModule {}
