import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  IMessage as GiftedChatMessage,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ChatSendButton: FC = (props: SendProps<GiftedChatMessage>) => {
  return (
    <Send {...props} containerStyle={styles.container}>
      <Icon name="send" size={30} color="tomato" />
    </Send>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
