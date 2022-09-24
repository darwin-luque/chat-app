import React, { FC, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { listContactsAction } from '../../../store/modules';

export const ContactsList: FC = () => {
  const { contacts, loading, next } = useAppSelector((state) => state.contacts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!contacts && next) {
      dispatch(listContactsAction(next));
    }
  }, [contacts, dispatch, next]);

  console.log({ contacts, loading, next });

  return (
    <View>
      <Text>ContactsList</Text>
    </View>
  );
};
