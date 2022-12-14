import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { theme } from '../../../constants';

export interface NewChatProps {
  onNewChat: () => void;
}

export const NewChatIcon: FC<NewChatProps> = ({ onNewChat }) => {
  return (
    <TouchableOpacity onPress={onNewChat}>
      <Icon name="new-message" color={theme.colors.success} size={20} />
    </TouchableOpacity>
  );
};
