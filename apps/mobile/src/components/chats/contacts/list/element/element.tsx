import React, { FC, useMemo } from 'react';
import { IUser } from '@chat-app/utils';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../../constants';

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
      <View style={styles.imageContainer}>
        {contact.picture ? (
          <Image source={{ uri: contact.picture }} style={styles.image} />
        ) : (
          <Icon name="user" color={theme.colors.text} size={32} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.username}>{contact.username}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
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
  imageContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {},
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
