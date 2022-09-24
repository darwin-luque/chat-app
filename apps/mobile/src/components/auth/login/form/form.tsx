import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { REGISTER_SCREEN, theme } from '../../../../constants';
import TerminalIcon from '../../../../assets/icons/jsx/terminal.icon';
import { loginAction } from '../../../../store/modules';
import { useAppDispatch } from '../../../../hooks/redux.hook';

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigation();
  const dispatch = useAppDispatch();

  const onRegister = () => {
    navigator.navigate(REGISTER_SCREEN);
  };

  const onLogin = () => {
    // TODO: Implement redux
    dispatch(loginAction({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TerminalIcon width="40" height="40" fill={theme.colors.text} />
        <Text style={styles.title}>Chat App</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={theme.colors.grays[400]}
              value={username}
              onChangeText={setUsername}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="************"
              secureTextEntry
              placeholderTextColor={theme.colors.grays[400]}
              passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8"
              value={password}
              onChangeText={setPassword}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.register}>
          <Text style={styles.message}>Don't have an account? </Text>
          <TouchableOpacity onPress={onRegister} style={styles.link}>
            <Text style={styles.strong}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 32,
    paddingRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  form: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: 32,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: theme.colors.text,
    width: 275,
  },
  field: {
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginTop: 48,
    width: 200,
  },
  button: {
    backgroundColor: theme.colors.buttons.fill.background,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.buttons.fill.text,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  register: {
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  strong: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.link,
  },
});
