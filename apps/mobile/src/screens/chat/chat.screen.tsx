import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { LeftNavigator } from '../../components/ui/left-navigator';
import { useAppSelector } from '../../hooks/redux.hook';
import { Layout } from '../../components/ui/layout';
import { CHATS_SCREEN } from '../../constants';
import { Chat } from '../../components/chat';

export const ChatScreen: FC = () => {
  const { currentContact } = useAppSelector((state) => state.contacts);

  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({
      headerMode: 'screen',
      gestureEnabled: true,
      headerTitle: currentContact?.username ?? '',
      headerRight: () => null,
      headerLeft: () => (
        <LeftNavigator
          label="Chats"
          onNavigate={() => navigator.navigate(CHATS_SCREEN)}
        />
      ),
    } as NativeStackNavigationOptions);
  }, [currentContact?.username, navigator]);

  return (
    <Layout>
      <Chat />
    </Layout>
  );
};
