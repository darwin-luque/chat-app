import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { IPage, IUser } from '@chat-app/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hook';
import { ContactsListFilter } from '../../../ui/filter';
import { CHAT_SCREEN, firstPage } from '../../../../constants';
import { ContactElement } from './element';
import {
  findOrCreateConversationAction,
  listContactsAction,
} from '../../../../store/modules';
import { useNavigation } from '@react-navigation/native';

export const ContactsList: FC = () => {
  const [filter, setFilter] = useState('');
  const { contacts, loading, next } = useAppSelector((state) => state.contacts);
  const navigator = useNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listContactsAction(firstPage, filter, true));
  }, [dispatch, filter]);

  const loadContacts = useCallback(
    (page: IPage = firstPage) => {
      if (!contacts) {
        dispatch(listContactsAction(page, '', true));
      }
    },
    [contacts, dispatch]
  );

  const applyFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const getNextContacts = useCallback(() => {
    if (next) {
      dispatch(listContactsAction(next, filter));
    }
  }, [dispatch, filter, next]);

  useEffect(() => {
    next && loadContacts(next);
  }, [loadContacts, next]);

  const onSelectContact = (contact: IUser) => {
    dispatch(findOrCreateConversationAction(contact.id));
    navigator.navigate(CHAT_SCREEN);
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={<ContactsListFilter onFilter={applyFilter} />}
      ListHeaderComponentStyle={styles.header}
      refreshing={loading}
      onRefresh={loadContacts}
      onEndReached={getNextContacts}
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ContactElement
          onSelect={() => onSelectContact(item)}
          contact={item}
          isLast={index + 1 === contacts?.length}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: Dimensions.get('screen').width,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
