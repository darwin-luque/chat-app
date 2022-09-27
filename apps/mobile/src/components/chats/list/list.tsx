import { FC, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { firstPage } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { listConversationsAction } from '../../../store/modules';

export const ChatsList: FC = () => {
  const { conversations, loading } = useAppSelector((state) => state.chats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!conversations) {
      dispatch(listConversationsAction(firstPage, true));
    }
  }, [conversations, dispatch]);

  return (
    <FlatList
      data={conversations}
      refreshing={loading}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.id}</Text>}
    />
  );
};
