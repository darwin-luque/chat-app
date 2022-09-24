import { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../constants';
import { DismissKeyboardView } from '../../hoc/dismiss-keyboard-view';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DismissKeyboardView style={styles.container}>
      {children}
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
