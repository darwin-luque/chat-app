import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface LeftNavigatorProps {
  onNavigate: () => void;
  label: string;
}

export const LeftNavigator: FC<LeftNavigatorProps> = ({
  onNavigate,
  label,
}) => (
  <TouchableOpacity style={styles.left} onPress={onNavigate}>
    <Icon name="left" size={24} color="blue" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'blue',
  },
});
