import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { NewChatIcon } from '../../components/chats/new-chat-icon';
import { Layout } from '../../components/ui/layout';

export const ChatsScreen: FC = () => {
  const navigator = useNavigation();

  const onCreateChat = () => {
    console.log('Move to create chat screen');
  };

  useLayoutEffect(() => {
    navigator.setOptions({
      headerMode: 'screen',
      gestureEnabled: true,
      headerRight: () => <NewChatIcon onNewChat={onCreateChat} />,
    });
  }, [navigator]);

  return (
    <Layout>
      <Text>Chats Screen</Text>
    </Layout>
  );
};
