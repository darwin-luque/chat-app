import { IConversation, IMessage, IPage } from '@chat-app/utils';
import { ActionTypes } from '../../../constants';

export interface MessageOnState {
  data: IMessage;
  loading: boolean;
  error: string;
  next: IPage | null;
}

export interface ConversationOnState extends Omit<IConversation, 'messages'> {
  messages: MessageOnState[];
}

export interface ChatsState {
  conversations: ConversationOnState[];
  currentConversation: ConversationOnState | null;
  loading: boolean;
  error: string | null;
  next: IPage | null;
}

export interface ChatsActions {
  type: ActionTypes;
  conversations?: ConversationOnState[];
  conversation?: ConversationOnState;
  shouldAppend?: boolean;
  messages?: IMessage[];
  message?: IMessage;
  error?: string;
}
