import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// TODO: Apply lazy loading
import { LoginScreen } from '../../screens/login';
import { LOGIN_SCREEN } from '../../../constants/definitions';

const Stack = createNativeStackNavigator();

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
