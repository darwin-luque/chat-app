import React, { FC, useCallback, useRef } from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
} from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';
import { theme } from '../../../constants';

export const ChatInput: FC<ComposerProps> = ({
  composerHeight = 33,
  disableComposer = false,
  keyboardAppearance = 'default',
  onInputSizeChanged = () => null,
  onTextChanged = () => null,
  placeholderTextColor = theme.colors.chat.input.text,
  text = '',
  textInputAutoFocus = false,
  textInputProps = {},
}) => {
  const layoutRef = useRef<{ width: number; height: number }>();

  const handleOnLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      // Support earlier versions of React Native on Android.
      if (!layout) {
        return;
      }

      if (
        !layoutRef ||
        (layoutRef.current &&
          (layoutRef.current.width !== layout.width ||
            layoutRef.current.height !== layout.height))
      ) {
        layoutRef.current = layout;
        onInputSizeChanged?.(layout);
      }
    },
    [onInputSizeChanged]
  );
  return (
    <TextInput
      accessible
      accessibilityLabel="Type a message..."
      placeholder="Type a message..."
      placeholderTextColor={placeholderTextColor}
      multiline
      editable={!disableComposer}
      onLayout={handleOnLayout}
      onChangeText={onTextChanged}
      style={StyleSheet.compose<TextStyle>(styles.input, {
        height: composerHeight,
        ...Platform.select({
          web: {
            outlineWidth: 0,
            outlineColor: 'transparent',
            outlineOffset: 0,
          },
        }),
      })}
      autoFocus={textInputAutoFocus}
      value={text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      {...textInputProps}
    />
  );
};

const styles = {
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 20,
    color: theme.colors.chat.input.text,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
};
