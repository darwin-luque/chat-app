import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../../constants';

export interface ProfileLogoutProps {
  onLogout: () => void;
}

export const ProfileLogout: FC<ProfileLogoutProps> = ({ onLogout }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onLogout}>
      <Text style={styles.label}>Logout</Text>
      <Icon name="logout" size={24} color={theme.colors.buttons.logout.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: theme.colors.buttons.logout.background,
    borderRadius: 26,
  },
  label: {
    color: theme.colors.buttons.logout.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
  },
});
