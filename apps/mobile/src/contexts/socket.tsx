import React, { createContext, useCallback, useRef, useState } from 'react';
import { IMessage, IPage } from '@chat-app/types';
import { Socket, io } from 'socket.io-client';
import { firstPage } from '../constants';
import { ChatService } from '../services/chat.service';
import { appendArrayWithNewOnly } from '../utils';

type Messages = { items: IMessage[]; page: IPage | null };
type MessagesConversation = { [key: string]: Messages };

interface ISocketContextValue {
  socket: Socket | null;
  messages: MessagesConversation;
  onInit: (userId: string) => void;
  onDisconnect: () => void;
  listenToMessages: (token: string) => void;
  getMessagesForConversation: (conversationId: string) => Messages;
  getSocket: () => Socket | null;
  onLoadMessages: (
    conversationId: string,
    token: string,
    page: IPage,
    restart: boolean
  ) => Promise<void>;
}

export const SocketContext = createContext<ISocketContextValue>({
  socket: null,
  messages: {},
  onInit: () => undefined,
  onDisconnect: () => undefined,
  listenToMessages: () => undefined,
  getSocket: () => null,
  onLoadMessages: () => Promise.resolve(),
  getMessagesForConversation: () => ({ items: [], page: firstPage }),
});

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState<MessagesConversation>({});
  const socket = useRef<Socket | null>(null);

  const onInit = useCallback((userId: string) => {
    socket.current = io('http://localhost:3002', {
      query: { userId },
    });
  }, []);

  const onLoadMessages = useCallback(
    async (
      conversationId: string,
      token: string,
      page: IPage = firstPage,
      restart = true
    ) => {
      const messages = await ChatService.listMessagesForConversation(
        token,
        conversationId,
        page
      );

      const newMessagesForConversation = restart
        ? messages.items
        : appendArrayWithNewOnly(
            messages.items,
            messages[conversationId] ?? []
          );
      setMessages((prev) => ({
        ...prev,
        [conversationId]: {
          items: newMessagesForConversation,
          page: messages.next,
        },
      }));
    },
    []
  );

  const updateMessages = useCallback(
    (
      prevMessages: MessagesConversation,
      receivedMessage: IMessage,
      token: string
    ) => {
      const currentMessage = prevMessages[receivedMessage.conversation.id];
      if (!currentMessage) {
        onLoadMessages(receivedMessage.conversation.id, token);
        return prevMessages;
      }

      currentMessage.items.unshift(receivedMessage);

      return {
        ...prevMessages,
        [receivedMessage.conversation.id]: currentMessage,
      };
    },
    [onLoadMessages]
  );

  const listenToMessages = useCallback(
    (token: string) => {
      socket.current?.on('receive-message', (receivedMessage: IMessage) => {
        setMessages((prevMessages) =>
          updateMessages(prevMessages, receivedMessage, token)
        );
      });
    },
    [updateMessages]
  );

  const onDisconnect = useCallback(() => {
    socket.current?.disconnect();
    socket.current = null;
  }, []);

  const getSocket = (): Socket | null => socket.current;

  const getMessagesForConversation = useCallback(
    (conversationId: string): Messages =>
      messages[conversationId] ?? { items: [], page: firstPage },
    [messages]
  );

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        messages,
        onInit,
        getSocket,
        onDisconnect,
        onLoadMessages,
        listenToMessages,
        getMessagesForConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
