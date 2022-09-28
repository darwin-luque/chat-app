import React, { createContext, useCallback, useRef } from 'react';
import { IMessage, ISendMessage } from '@chat-app/types';
import { Socket, io } from 'socket.io-client';

interface ISocketContextValue {
  socket: Socket | null;
  onInit: (userId: string) => void;
  onDisconnect: () => void;
  onSendMessage: (message: ISendMessage) => void;
  onReceiveMessage: (listener: (message: IMessage) => void) => void;
}

export const SocketContext = createContext<ISocketContextValue>({
  socket: null,
  onDisconnect: () => undefined,
  onInit: () => undefined,
  onSendMessage: () => undefined,
  onReceiveMessage: () => undefined,
});

export const SocketProvider = ({ children }) => {
  const socket = useRef<Socket | null>(null);

  const onInit = useCallback((userId: string) => {
    socket.current = io('http://localhost:3002');

    socket.current.emit('add-user', userId);
  }, []);

  const onDisconnect = useCallback(() => {
    socket.current?.disconnect();
    socket.current = null;
  }, []);

  const onSendMessage = useCallback((message: ISendMessage) => {
    socket.current?.emit('send-message', message);
  }, []);

  const onReceiveMessage = useCallback(
    (listener: (message: IMessage) => void) => {
      return socket.current?.on('receive-message', listener);
    },
    []
  );

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        onInit,
        onDisconnect,
        onSendMessage,
        onReceiveMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
