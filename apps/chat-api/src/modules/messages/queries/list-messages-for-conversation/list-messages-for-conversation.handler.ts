import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_ORDER,
} from '@chat-app/nest-utils';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Message } from '../../../../infrastructure/entities/message.entity';
import { ListMessagesForConversationQuery } from './list-messages-for-conversation.query';

@QueryHandler(ListMessagesForConversationQuery)
export class ListMessagesForConversationHandler
  implements IQueryHandler<ListMessagesForConversationQuery> {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>
  ) {}

  execute(
    query: ListMessagesForConversationQuery
  ): Promise<[Message[], number]> {
    return this.messagesRepository.findAndCount({
      where: {
        conversation: { id: query.conversationId },
        body: ILike(`%${query.data.q}%`),
      },
      order: {
        [query.data.field ?? 'createdAt']: query.data.order ?? DEFAULT_ORDER,
      },
      skip: query.data.offset ?? DEFAULT_OFFSET,
      take: query.data.limit ?? DEFAULT_LIMIT,
    });
  }
}
