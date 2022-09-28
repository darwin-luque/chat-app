import { Expose, Type } from 'class-transformer';
import { MessageDto } from '../../messages/dtos/message.dto';

export class ConversationDto {
  @Expose()
  id: string;

  @Expose()
  members: string[];

  @Expose()
  @Type(() => MessageDto)
  lastMessage?: MessageDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
