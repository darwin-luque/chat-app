import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../../../infrastructure/entities/conversation.entity';
import { Message } from '../../../../infrastructure/entities/message.entity';
import { AppendMessageCommand } from './append-message.command';

@CommandHandler(AppendMessageCommand)
export class AppendMessageHandler
  implements ICommandHandler<AppendMessageCommand> {
  constructor(
    @InjectRepository(Conversation)
    public readonly conversationsRepository: Repository<Conversation>,
    @InjectRepository(Message)
    public readonly messagesRepository: Repository<Message>
  ) {}

  async execute(command: AppendMessageCommand): Promise<[Message, string[]]> {
    const conversation = await this.conversationsRepository.findOneBy({
      id: command.data.conversationId,
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const message = await this.messagesRepository.save(
      this.messagesRepository.create({
        conversation,
        body: command.data.body,
        user: command.data.userId,
      })
    );

    return [message, conversation.members];
  }
}
