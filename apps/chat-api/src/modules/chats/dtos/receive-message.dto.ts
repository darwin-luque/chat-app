import { ISendMessage } from '@chat-app/types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ReceiveMessageDto implements ISendMessage {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  conversationId: string;
}
