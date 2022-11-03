import {
  GiftedChat,
  IMessage as GiftedChatMessage,
} from 'react-native-gifted-chat';
import { StyleSheet, View } from 'react-native';
import { IMessage, IPage } from '@chat-app/types';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { mapMessages, mapUser } from './utils';
import { useAppSelector } from '../../hooks/redux.hook';
import { SocketContext } from '../../contexts/socket';
import { ChatInputToolbar } from './input-toolbar';
import { ChatSendButton } from './send-button';
import { firstPage } from '../../constants';
import { ChatInput } from './input';
import { useFocusEffect } from '@react-navigation/native';

export const Chat: FC = () => {
  const { onLoadMessages, getMessagesForConversation, getSocket } =
    useContext(SocketContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState<IPage | null>(firstPage);
  const currentContact = useAppSelector(
    (state) => state.contacts.currentContact
  );
  const { attributes, accessToken } =
    useAppSelector((state) => state.auth.session) ?? {};
  const conversation = useAppSelector(
    (state) => state.chats.currentConversation
  );

  const loadMessages = useCallback(
    (page: IPage = firstPage, restart = true) => {
      if (conversation?.id && accessToken?.jwtToken) {
        onLoadMessages(conversation.id, accessToken.jwtToken, page, restart);
      }
    },
    [accessToken?.jwtToken, conversation?.id, onLoadMessages]
  );
  useFocusEffect(loadMessages);

  useEffect(() => {
    if (conversation?.id) {
      const { items, page: newPage } = getMessagesForConversation(
        conversation.id
      );
      setMessages(items);
      setPage(newPage);
    }
  }, [conversation?.id, getMessagesForConversation]);

  const onSend = async (messagesToSend: GiftedChatMessage[]) => {
    if (conversation && accessToken?.jwtToken && attributes && currentContact) {
      const socket = getSocket();
      socket?.emit('send-message', {
        body: messagesToSend[0].text,
        userId: attributes.id,
        conversationId: conversation.id,
      });
    }
  };

  return attributes && currentContact ? (
    <View style={styles.container}>
      <GiftedChat
        messages={mapMessages(messages, attributes, currentContact)}
        user={mapUser(attributes)}
        renderSend={ChatSendButton}
        renderInputToolbar={(props) => <ChatInputToolbar {...props} />}
        renderComposer={(props) => <ChatInput {...props} />}
        onSend={onSend}
        onLoadEarlier={() => page && loadMessages(page, false)}
        infiniteScroll
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
