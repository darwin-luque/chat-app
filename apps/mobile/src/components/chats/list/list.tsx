import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CHAT_SCREEN, firstPage } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import {
  listConversationsAction,
  selectConversationAction,
} from '../../../store/modules';
import { ChatElement } from './element';

export const ChatsList: FC = () => {
  const { conversations, loading, next } = useAppSelector(
    (state) => state.chats
  );
  const dispatch = useAppDispatch();
  const navigator = useNavigation();

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

  const onSelectConversation = (conversationId: string, contactId: string) => {
    dispatch(selectConversationAction(conversationId, contactId));
    navigator.navigate(CHAT_SCREEN);
  };

  return (
    <FlatList
      data={conversations}
      refreshing={loading}
      contentContainerStyle={styles.list}
      onRefresh={loadConversations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatElement conversation={item} onSelect={onSelectConversation} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
