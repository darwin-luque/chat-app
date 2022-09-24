import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatsScreen } from '../../screens/chats';
import { CHATS_SCREEN, theme } from '../../constants';
import { StyleSheet } from 'react-native';

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
