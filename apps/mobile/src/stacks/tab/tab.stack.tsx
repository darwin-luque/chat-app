import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CHAT_STACK, SETTINGS_STACK, theme } from '../../constants';
import { SettingsStack } from '../settings';
import { ChatStack } from '../chat';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.tab.background,
    borderTopColor: theme.colors.tab.line,
    borderTopWidth: 1,
    height: 80,
  },
});

const Tab = createBottomTabNavigator();

export const TabStack: FC = () => {
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
      <Tab.Screen
        name={SETTINGS_STACK}
        component={SettingsStack}
        options={{
          tabBarIcon({ color }) {
            return <Icon color={color} size={28} name="setting" />;
          },
          tabBarLabel() {
            return null;
          },
          tabBarAccessibilityLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
