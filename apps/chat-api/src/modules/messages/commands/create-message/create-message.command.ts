import { CreateMessageDto } from '../../dtos/create-message.dto';

export class CreateMessageCommand {
  constructor(
    public readonly data: CreateMessageDto,
    public readonly conversationId: string,
    public readonly userId: string
  ) {}
}
