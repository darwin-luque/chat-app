import React, { FC, useMemo } from 'react';
import { IUser } from '@chat-app/types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '../../../../../constants';
import { ProfilePicture } from '../../../../ui/profile-picture';

export interface ContactElementProps {
  contact: IUser;
  onSelect: () => void;
  isLast?: boolean;
}

export const ContactElement: FC<ContactElementProps> = ({
  contact,
  onSelect,
  isLast,
}) => {
  const name = useMemo(
    () => [contact.firstName, contact.lastName].filter(Boolean).join(' '),
    [contact.firstName, contact.lastName]
  );
  return (
    <TouchableOpacity
      style={StyleSheet.compose<ViewStyle>(
        styles.container,
        isLast ? {} : styles.notLast
      )}
      onPress={onSelect}
    >
      <ProfilePicture picture={contact.picture} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{contact.username}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  notLast: {
    borderColor: theme.colors.grays[400],
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  textContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  username: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    color: theme.colors.text,
  },
});
