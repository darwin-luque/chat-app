import React, { FC, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import {
  Actions,
  Composer,
  ComposerProps,
  IMessage as GiftedChatMessage,
  InputToolbarProps,
  Send,
} from 'react-native-gifted-chat';
import { theme } from '../../../constants';

export const ChatInputToolbar: FC<InputToolbarProps<GiftedChatMessage>> = (
  props
) => {
  const { containerStyle: _, ...rest } = props;
  const {
    renderActions,
    onPressActionButton,
    renderComposer,
    renderSend,
    renderAccessory,
  } = rest;

  const [position, setPosition] = useState<'absolute' | 'relative'>('absolute');

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setPosition('relative')
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setPosition('absolute')
    );
    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  return (
    <View
      style={StyleSheet.compose<ViewStyle>(styles.container, {
        position,
        bottom: position === 'absolute' ? -30 : -110,
      })}
    >
      <View style={styles.primary}>
        {renderActions?.(rest) ??
          (onPressActionButton && <Actions {...rest} />)}
        {renderComposer?.(props as ComposerProps) ?? (
          <Composer multiline {...props} />
        )}
        {renderSend?.(props) ?? <Send {...props} />}
      </View>
      {renderAccessory && (
        <View style={styles.accessory}>{renderAccessory(props)}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: theme.colors.chat.input.border,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
});
