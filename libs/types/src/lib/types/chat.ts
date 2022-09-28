export interface IConversation {
  id: string;
  members: string[];
  messages?: IMessage[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  conversation: IConversation;
  user: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISendMessage {
  body: string;
  userId: string;
  conversationId: string;
}
