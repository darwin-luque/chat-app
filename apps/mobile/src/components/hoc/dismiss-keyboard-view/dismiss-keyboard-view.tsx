import React from 'react';
import { TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';

const DismissKeyboardHOC = (Comp: typeof SafeAreaView) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

export const DismissKeyboardView = DismissKeyboardHOC(SafeAreaView);
