import React, { FC } from 'react';
import { Text, SafeAreaView } from 'react-native';

export const LoginScreen: FC = () => {
  console.log('LoginScreen');
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Login Screen</Text>
    </SafeAreaView>
  );
};
