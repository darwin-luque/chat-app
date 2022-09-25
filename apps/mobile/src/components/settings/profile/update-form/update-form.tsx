import React, { FC, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hook';
import { theme } from '../../../../constants';
import { updateProfileAction } from '../../../../store/modules';

export const UpdateProfileForm: FC = () => {
  const profile = useAppSelector((state) => state.auth.session?.attributes);

  const [firstName, setFirstName] = useState(profile?.firstName ?? '');
  const [lastName, setLastName] = useState(profile?.lastName ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();

  const onUpdate = () => {
    if (password && password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
    }
    dispatch(
      updateProfileAction({
        firstName: firstName ? firstName : undefined,
        lastName: lastName ? lastName : undefined,
        password: password ? password : undefined,
      })
    );
    setPassword('');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Enter your First Name"
              placeholderTextColor={theme.colors.grays[400]}
              value={firstName}
              onChangeText={setFirstName}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="Enter your Last Name"
              placeholderTextColor={theme.colors.grays[400]}
              value={lastName}
              onChangeText={setLastName}
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
        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.input}
              placeholder="************"
              secureTextEntry
              placeholderTextColor={theme.colors.grays[400]}
              passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onUpdate}>
            <Text style={styles.buttonLabel}>Update</Text>
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
    marginVertical: 10,
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
});
