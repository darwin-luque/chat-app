import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CHAT_STACK } from '../../constants';
import { ChatStack } from '../chat';

const Stack = createNativeStackNavigator();

export const MainStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CHAT_STACK}
        component={ChatStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
