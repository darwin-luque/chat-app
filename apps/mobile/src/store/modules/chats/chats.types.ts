import { IConversation, IMessage, IPage } from '@chat-app/utils';
import { ActionTypes } from '../../../constants';

export interface ChatsState {
  conversations: IConversation[] | null;
  currentConversation: IConversation | null;
  loading: boolean;
  error: string | null;
  next: IPage | null;
}

export interface ChatsActions {
  type: ActionTypes;
  conversations?: IConversation[];
  conversation?: IConversation;
  shouldAppend?: boolean;
  messages?: IMessage[];
  message?: IMessage;
  restart?: boolean;
  error?: string;
  next?: IPage | null;
}
