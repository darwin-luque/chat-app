import { ReceiveMessageDto } from '../../dtos/receive-message.dto';

export class AppendMessageCommand {
  constructor(public readonly data: ReceiveMessageDto) {}
}
