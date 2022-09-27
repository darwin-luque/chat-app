import { FC, useCallback, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { firstPage } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { listConversationsAction } from '../../../store/modules';

export const ChatsList: FC = () => {
  const { conversations, loading, error, next } = useAppSelector(
    (state) => state.chats
  );
  const dispatch = useAppDispatch();

  const loadConversations = useCallback(
    (page = firstPage) => {
      if (!conversations) {
        dispatch(listConversationsAction(page, true));
      }
    },
    [conversations, dispatch]
  );

  useEffect(() => {
    next && loadConversations(next);
  }, [dispatch, loadConversations, next]);

  console.log({ conversations, loading, error });

  return (
    <FlatList
      data={conversations}
      refreshing={loading}
      onRefresh={loadConversations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.id}</Text>}
    />
  );
};
