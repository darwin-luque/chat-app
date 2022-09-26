import { ListConversationsDto } from '../../dto/list-conversations.dto';

export class ListConversationsQuery {
  constructor(
    public readonly data: ListConversationsDto,
    public readonly id: string
  ) {}
}
