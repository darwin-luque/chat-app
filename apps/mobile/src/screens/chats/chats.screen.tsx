import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { NewChatIcon } from '../../components/chats/new-chat-icon';
import { Layout } from '../../components/ui/layout';
import { NEW_CHAT_SCREEN } from '../../constants';

export const ChatsScreen: FC = () => {
  const navigator = useNavigation();

  const onCreateChat = useCallback(() => {
    navigator.navigate(NEW_CHAT_SCREEN);
  }, [navigator]);

  useLayoutEffect(() => {
    navigator.setOptions({
      headerMode: 'screen',
      gestureEnabled: true,
      headerRight: () => <NewChatIcon onNewChat={onCreateChat} />,
    });
  }, [navigator, onCreateChat]);

  return (
    <Layout>
      <Text>Chats Screen</Text>
    </Layout>
  );
};
