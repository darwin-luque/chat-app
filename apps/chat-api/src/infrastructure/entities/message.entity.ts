import { Base } from '@chat-app/nest-utils';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity({ name: 'message' })
export class Message extends Base {
  @Column({ name: 'body' })
  body: string;

  @Column({ name: 'user', type: 'uuid' })
  user: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}