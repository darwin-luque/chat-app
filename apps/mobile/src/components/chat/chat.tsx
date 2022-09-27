import { FC, useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage, IPage } from '@chat-app/types';
import { mapMessages, mapUser } from './utils';
import { useAppSelector } from '../../hooks/redux.hook';
import { ChatService } from '../../services/chat.service';
import { firstPage } from '../../constants';
import { appendArrayWithNewOnly } from '../../utils';
import { ChatSendButton } from './send-button';
import { StyleSheet, View } from 'react-native';
import { ChatInputToolbar } from './input-toolbar';

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
        const fetchedMessages = await ChatService.listMessagesForConversation(
          accessToken.jwtToken,
          conversation.id,
          page
        );
        setMessages((prevMessages) =>
          appendArrayWithNewOnly(prevMessages, fetchedMessages.items)
        );
        setPage(fetchedMessages.next);
      }
    },
    [accessToken?.jwtToken, conversation]
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return attributes && currentContact ? (
    <View style={styles.container}>
      <GiftedChat
        messages={mapMessages(messages, attributes, currentContact)}
        user={mapUser(attributes)}
        renderSend={ChatSendButton}
        renderInputToolbar={(props) => <ChatInputToolbar {...props} />}
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
