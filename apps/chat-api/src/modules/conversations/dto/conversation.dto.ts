import { Expose } from 'class-transformer';

export class ConversationDto {
  @Expose()
  id: string;

  @Expose()
  members: string[];

  @Expose()
  lastMessage?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
