import { ListMessagesDto } from '../../dtos/list-messages.dto';

export class ListMessagesForConversationQuery {
  constructor(
    public readonly conversationId: string,
    public readonly data: ListMessagesDto
  ) {}
}
