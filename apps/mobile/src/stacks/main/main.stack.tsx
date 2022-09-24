import React, { FC } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CHAT_STACK, theme } from '../../constants';
import { ChatStack } from '../chat';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.tab.background,
    borderTopColor: theme.colors.tab.line,
    borderTopWidth: 1,
  },
});

const Tab = createMaterialBottomTabNavigator();

export const MainStack: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={CHAT_STACK}
      activeColor={theme.colors.tab.active}
      inactiveColor={theme.colors.tab.inactive}
      barStyle={styles.bar}
    >
      <Tab.Screen
        name={CHAT_STACK}
        component={ChatStack}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="message-processing-outline" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
