import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../constants/styles/themes';
import { LoginForm } from '../../components/auth/login/form';
import { DismissKeyboardView } from '../../components/hoc/dismiss-keyboard-view';

export const LoginScreen: FC = () => {
  return (
    <DismissKeyboardView style={styles.container}>
      <LoginForm />
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
