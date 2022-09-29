import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_ORDER,
} from '@chat-app/nest-utils';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../../../infrastructure/entities/conversation.entity';
import { ListConversationsQuery } from './list-conversations.query';

@QueryHandler(ListConversationsQuery)
export class ListConversationsHandler
  implements IQueryHandler<ListConversationsQuery> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepository: Repository<Conversation>
  ) {}

  async execute(
    query: ListConversationsQuery
  ): Promise<[Conversation[], number]> {
    return this.conversationsRepository
      .createQueryBuilder('conversation')
      .where('conversation.members @> :ids', { ids: [query.id] })
      .leftJoinAndMapOne(
        'conversation.lastMessage',
        'conversation.messages',
        'messages'
      )
      .leftJoin(
        'conversation.messages',
        'lastMessage',
        'messages.createdAt < lastMessage.createdAt'
      )
      .andWhere('lastMessage.id IS NULL')
      .orderBy(
        `messages.${query.data.field ?? 'createdAt'}`,
        query.data.order ?? DEFAULT_ORDER
      )
      .skip(query.data.offset ?? DEFAULT_OFFSET)
      .take(query.data.limit ?? DEFAULT_LIMIT)
      .getManyAndCount();
  }
}
