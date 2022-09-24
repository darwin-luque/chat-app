import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatsScreen } from '../../screens/chats';
import { CHATS_SCREEN } from '../../constants';

const Stack = createNativeStackNavigator();

export const ChatStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={CHATS_SCREEN} component={ChatsScreen} />
    </Stack.Navigator>
  );
};
