import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { Layout } from '../../components/ui/layout';
import { LeftNavigator } from '../../components/ui/left-navigator';
import { useAppSelector } from '../../hooks/redux.hook';
import { CHATS_SCREEN } from '../../constants';

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
      <Text>Chat Screen</Text>
    </Layout>
  );
};
