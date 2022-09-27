import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IConversation, IUser } from '@chat-app/types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfilePicture } from '../../../ui/profile-picture';
import { theme } from '../../../../constants';
import { useAppSelector } from '../../../../hooks/redux.hook';
import { ContactsService } from '../../../../services/contacts.service';
import Toast from 'react-native-toast-message';

export interface ChatElementProps {
  conversation: IConversation;
  onSelect: (conversationId: string, contactId: string) => void;
}

export const ChatElement: FC<ChatElementProps> = ({
  conversation,
  onSelect,
}) => {
  const [contact, setContact] = useState<IUser>();
  const token = useAppSelector((state) => state.auth.session?.accessToken);
  const contacts = useAppSelector((state) => state.contacts.contacts);

  const contactId = useMemo(
    () => conversation.members.find((member) => member !== token?.payload.sub),
    [conversation.members, token?.payload.sub]
  );

  const getContact = useCallback(async () => {
    try {
      if (!contactId || !token?.jwtToken) {
        return;
      }
      let foundContact = contacts?.find((contact) => contact.id === contactId);

      if (!foundContact) {
        foundContact = await ContactsService.get(token.jwtToken, contactId);
      }
      setContact(foundContact);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  }, [contactId, contacts, token?.jwtToken]);

  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(conversation.id, contactId ?? '')}
    >
      <View style={styles.picture}>
        <ProfilePicture size={60} picture={contact?.picture} />
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{contact?.username}</Text>
        <Text style={styles.message}>
          {conversation.lastMessage?.body ?? ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grays[700],
  },
  picture: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '70%',
    marginLeft: '5%',
  },
  username: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  message: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.9,
    flexWrap: 'wrap',
  },
});
