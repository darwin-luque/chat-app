import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { CHAT_STACK, theme } from '../../constants';
import { ChatStack } from '../chat';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.tab.background,
    borderTopColor: theme.colors.tab.line,
    borderTopWidth: 1,
    height: 80,
  },
});

const Tab = createBottomTabNavigator();

export const MainStack: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={CHAT_STACK}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: theme.colors.tab.active,
        tabBarInactiveTintColor: theme.colors.tab.inactive,
      }}
    >
      <Tab.Screen
        name={CHAT_STACK}
        component={ChatStack}
        options={{
          tabBarIcon({ color }) {
            return <Icon color={color} size={28} name="message1" />;
          },
          tabBarLabel() {
            return null;
          },
          tabBarAccessibilityLabel: 'Chat',
        }}
      />
    </Tab.Navigator>
  );
};
