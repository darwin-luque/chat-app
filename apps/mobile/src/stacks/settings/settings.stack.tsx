import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../../screens/settings';
import { SETTINGS_SCREEN } from '../../constants';

const Stack = createNativeStackNavigator();

export const SettingsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
