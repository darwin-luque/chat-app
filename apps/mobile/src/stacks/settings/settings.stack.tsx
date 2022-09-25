import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen } from '../../screens/settings';
import { SETTINGS_SCREEN, theme, UPDATE_PROFILE_SCREEN } from '../../constants';
import { UpdateProfileScreen } from '../../screens/update-profile';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export const SettingsStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SETTINGS_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />
      <Stack.Screen
        name={UPDATE_PROFILE_SCREEN}
        component={UpdateProfileScreen}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
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
