import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CHATS_SCREEN, CHAT_SCREEN, NEW_CHAT_SCREEN, theme } from '../../constants';
import { NewChatScreen } from '../../screens/new-chat';
import { ChatsScreen } from '../../screens/chats';
import { ChatScreen } from '../../screens/chat';

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
        name={CHAT_SCREEN}
        component={ChatScreen}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          title: 'Chat',
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
