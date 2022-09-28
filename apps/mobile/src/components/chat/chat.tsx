import {
  GiftedChat,
  IMessage as GiftedChatMessage,
} from 'react-native-gifted-chat';
import { StyleSheet, View } from 'react-native';
import { IMessage, IPage } from '@chat-app/types';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { appendArrayWithNewOnly, logger } from '../../utils';
import { mapMessage, mapMessages, mapUser } from './utils';
import { ChatService } from '../../services/chat.service';
import { useAppSelector } from '../../hooks/redux.hook';
import { SocketContext } from '../../contexts/socket';
import { ChatInputToolbar } from './input-toolbar';
import { ChatSendButton } from './send-button';
import { firstPage } from '../../constants';
import { ChatInput } from './input';

export const Chat: FC = () => {
  const { onSendMessage, onReceiveMessage } = useContext(SocketContext);
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
    async (page: IPage = firstPage) => {
      if (conversation && accessToken?.jwtToken) {
        try {
          const fetchedMessages = await ChatService.listMessagesForConversation(
            accessToken.jwtToken,
            conversation.id,
            page
          );
          setMessages((prevMessages) =>
            appendArrayWithNewOnly(prevMessages, fetchedMessages.items)
          );
          setPage(fetchedMessages.next);
        } catch (error) {
          logger(error);
        }
      }
    },
    [accessToken?.jwtToken, conversation]
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    if (attributes && currentContact) {
      onReceiveMessage((receivedMessage: IMessage) => {
        console.log({ receivedMessage });
        setMessages((prevMessages) => {
          const newMessages = [receivedMessage, ...prevMessages];
          GiftedChat.append(
            mapMessages(prevMessages, attributes, currentContact),
            [mapMessage(receivedMessage, attributes, currentContact)]
          );
          return newMessages;
        });
      });
    }
  }, [attributes, currentContact, onReceiveMessage]);

  const onSend = async (messagesToSend: GiftedChatMessage[]) => {
    if (conversation && accessToken?.jwtToken && attributes && currentContact) {
      try {
        onSendMessage({
          body: messagesToSend[0].text,
          userId: attributes.id,
          conversationId: conversation.id,
        });
      } catch (error) {
        logger(error);
      }
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
        onLoadEarlier={() => page && loadMessages(page)}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
