import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { CHAT_SCREEN, TAB_STACK, theme } from '../../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabStack } from '../tab';
import { ChatScreen } from '../../screens/chat';

const Stack = createNativeStackNavigator();

export const MainStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={TAB_STACK}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={TAB_STACK} component={TabStack} />
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
