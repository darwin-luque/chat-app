import {
  IMessage as GiftedChatMessage,
  User as GiftedChatUser,
} from 'react-native-gifted-chat';
import { IMessage, IUserWithoutPassword } from '@chat-app/types';

export const mapUser = (user: IUserWithoutPassword): GiftedChatUser => {
  return {
    _id: user.id,
    name: user.username,
    avatar: user.picture,
  };
};

export const mapMessage = (
  message: IMessage,
  user: IUserWithoutPassword,
  contact: IUserWithoutPassword
): GiftedChatMessage => {
  return {
    _id: message.id,
    text: message.body,
    createdAt: message.createdAt,
    pending: false,
    user: mapUser(message.user === user.id ? user : contact),
  };
};

export const mapMessages = (
  messsages: IMessage[],
  user: IUserWithoutPassword,
  contact: IUserWithoutPassword
): GiftedChatMessage[] =>
  messsages.map((message) => mapMessage(message, user, contact));
