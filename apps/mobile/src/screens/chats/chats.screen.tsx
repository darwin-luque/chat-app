import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { NewChat } from '../../components/chats/new-chat/new-chat';
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
      headerRight: () => <NewChat onNewChat={onCreateChat} />
    });
  }, [navigator]);

  return (
    <Layout>
      <Text>Chats Screen</Text>
    </Layout>
  );
};
