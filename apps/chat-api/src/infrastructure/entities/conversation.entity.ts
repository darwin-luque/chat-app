import { Column, Entity, OneToMany } from 'typeorm';
import { IConversation } from '@chat-app/types';
import { Base } from '@chat-app/nest-utils';
import { Message } from './message.entity';

@Entity({ name: 'conversation' })
export class Conversation extends Base implements IConversation {
  @Column({ name: 'members', array: true, type: 'uuid' })
  members: string[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  lastMessage?: Message;
}
