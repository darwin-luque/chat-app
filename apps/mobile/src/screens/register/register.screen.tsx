import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../constants/styles/themes';
import { RegisterForm } from '../../components/auth/register/form';
import { DismissKeyboardView } from '../../components/hoc/dismiss-keyboard-view';

export const RegisterScreen: FC = () => {
  return (
    <DismissKeyboardView style={styles.container}>
      <RegisterForm />
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
