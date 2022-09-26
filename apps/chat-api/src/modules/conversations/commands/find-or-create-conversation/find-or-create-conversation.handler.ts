import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { Conversation } from '../../../../infrastructure/entities/conversation.entity';
import { FindOrCreateConversationCommand } from './find-or-create-conversation.command';

@CommandHandler(FindOrCreateConversationCommand)
export class FindOrCreateConversationHandler
  implements ICommandHandler<FindOrCreateConversationCommand> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>
  ) {}

  async execute({
    members,
  }: FindOrCreateConversationCommand): Promise<Conversation> {
    const foundConversation = await this.conversationsRepository.findOneBy({
      members: ArrayContains(members),
    });

    if (foundConversation) {
      return foundConversation;
    }

    return this.conversationsRepository.save(
      this.conversationsRepository.create({ members })
    );
  }
}
