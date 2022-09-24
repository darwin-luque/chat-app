import React, { FC, useCallback, useEffect } from 'react';
import { IPage, IUser } from '@chat-app/utils';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hook';
import { listContactsAction } from '../../../../store/modules';
import { ContactElement } from './element';
import { ContactsListFilter } from '../../../ui/filter';

const firstPage = { offset: 0, limit: 20 };

export const ContactsList: FC = () => {
  const { contacts, loading, next } = useAppSelector((state) => state.contacts);

  const dispatch = useAppDispatch();

  const loadContacts = useCallback(
    (page: IPage = firstPage) => {
      if (!contacts) {
        dispatch(listContactsAction(page, '', true));
      }
    },
    [contacts, dispatch]
  );

  const applyFilter = useCallback(
    (filter: string) => {
      dispatch(listContactsAction(firstPage, filter, true));
    },
    [dispatch]
  );

  useEffect(() => {
    next && loadContacts(next);
  }, [loadContacts, next]);

  const onSelectContact = (contact: IUser) => {
    console.log({ contact });
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={<ContactsListFilter onFilter={applyFilter} />}
      ListHeaderComponentStyle={styles.header}
      refreshing={loading}
      onRefresh={loadContacts}
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
