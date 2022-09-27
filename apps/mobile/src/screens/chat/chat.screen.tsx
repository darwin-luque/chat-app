import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { Layout } from '../../components/ui/layout';
import { useAppSelector } from '../../hooks/redux.hook';


export const ChatScreen: FC = () => {
  const { currentConversation } = useAppSelector((state) => state.chats);
  const { currentContact } = useAppSelector((state) => state.contacts);

  const navigator = useNavigation();

  console.log({ currentConversation });

  useLayoutEffect(() => {
    navigator.setOptions({
      headerMode: 'screen',
      gestureEnabled: true,
      headerTitle: currentContact?.username ?? '',
    });
  }, [currentContact?.username, navigator]);

  return (
    <Layout>
      <Text>Chat Screen</Text>
    </Layout>
  )
};
