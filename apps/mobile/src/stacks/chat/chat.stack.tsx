import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CHATS_SCREEN, NEW_CHAT_SCREEN, theme } from '../../constants';
import { NewChatScreen } from '../../screens/new-chat';
import { ChatsScreen } from '../../screens/chats';

const Stack = createNativeStackNavigator();

export const ChatStack: FC = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={CHATS_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={CHATS_SCREEN}
        component={ChatsScreen}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          title: 'Chats',
        }}
      />
      <Stack.Screen
        name={NEW_CHAT_SCREEN}
        component={NewChatScreen}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          title: 'New Chat',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.tab.background,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
  },
});
