import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from '../auth';
import { AUTH_STACK } from '../../../constants/definitions';

const Stack = createNativeStackNavigator();

export const Router: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
