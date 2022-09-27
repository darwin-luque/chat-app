import {
  GiftedChat,
  IMessage as GiftedChatMessage,
} from 'react-native-gifted-chat';
import { StyleSheet, View } from 'react-native';
import { IMessage, IPage } from '@chat-app/types';
import { FC, useCallback, useEffect, useState } from 'react';
import { ChatService } from '../../services/chat.service';
import { useAppSelector } from '../../hooks/redux.hook';
import { ChatInputToolbar } from './input-toolbar';
import { ChatSendButton } from './send-button';
import { ChatInput } from './input';
import { appendArrayWithNewOnly, logger } from '../../utils';
import { mapMessages, mapUser } from './utils';
import { firstPage } from '../../constants';

export const Chat: FC = () => {
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

  const onSend = async (messagesToSend: GiftedChatMessage[]) => {
    if (conversation && accessToken?.jwtToken && attributes && currentContact) {
      try {
        const sentMessage = await ChatService.sendMessage(
          accessToken.jwtToken,
          conversation.id,
          messagesToSend[0].text
        );

        setMessages((prevMessages) => {
          const newMessages = [sentMessage, ...prevMessages];
          GiftedChat.append(
            mapMessages(prevMessages, attributes, currentContact),
            messagesToSend
          );
          return newMessages;
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
