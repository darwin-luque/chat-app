import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN_SCREEN, REGISTER_SCREEN } from '../../constants';
import { RegisterScreen } from '../../screens/register';
import { LoginScreen } from '../../screens/login';

const Stack = createNativeStackNavigator();

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
