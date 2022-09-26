import { NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../../../infrastructure/entities/conversation.entity';
import { Message } from '../../../../infrastructure/entities/message.entity';
import { CreateMessageCommand } from './create-message.command';

export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand> {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>
  ) {}

  async execute(command: CreateMessageCommand): Promise<Message> {
    const conversation = await this.conversationsRepository.findOneBy({
      id: command.conversationId,
    });

    if (!conversation) {
      throw new NotFoundException(
        `Conversation with id ${command.conversationId} not found`
      );
    }

    return this.messagesRepository.save(
      this.messagesRepository.create({
        conversation,
        body: command.data.body,
        user: command.userId,
      })
    );
  }
}
