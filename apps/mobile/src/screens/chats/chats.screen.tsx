import React, { FC } from 'react';
import { Text } from 'react-native';
import { DismissKeyboardView } from '../../components/hoc/dismiss-keyboard-view';

export const ChatsScreen: FC = () => {
  return (
    <DismissKeyboardView>
      <Text>Chats Screen</Text>
    </DismissKeyboardView>
  );
};
