import { IConversation, IPage } from '@chat-app/types';
import { ThunkAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { areEqual } from '@chat-app/utils';
import { AxiosError } from 'axios';
import { ChatService } from '../../../services/chat.service';
import { ActionTypes } from '../../../constants';
import { ChatsActions } from './chats.types';
import { RootState } from '../../index';
import { logger } from '../../../utils';
import { getContactAction } from '../contacts';

type Action = ThunkAction<void, RootState, unknown, ChatsActions>;

export const selectConversationAction = (
  conversationId: string,
  contactId: string
): Action => (dispatch, getState) => {
  dispatch(getContactAction(contactId));
  const conversation = getState().chats.conversations?.find(
    (conversation) => conversation.id === conversationId
  );
  if (conversation) {
    dispatch({ type: ActionTypes.SELECT_CONVERSATION, conversation });
    return;
  }

  dispatch(findOrCreateConversationAction(contactId));
};

export const findOrCreateConversationAction = Object.assign(
  (to: string): Action => async (dispatch, getState) => {
    dispatch(findOrCreateConversationAction.start());
    try {
      const session = getState().auth.session;

      if (!session) {
        throw new AxiosError('Unauthenticated user');
      }

      const { jwtToken, payload } = session.accessToken;

      const localConversation = getState().chats.conversations?.find(
        (conversation) => areEqual(conversation.members, [to, payload.sub])
      );

      dispatch(getContactAction(to));
      if (localConversation) {
        dispatch(
          findOrCreateConversationAction.success(localConversation, false)
        );
        return;
      }

      const foundConversation = await ChatService.findOrCreateConversation(
        jwtToken,
        to
      );

      dispatch(findOrCreateConversationAction.success(foundConversation, true));
    } catch (error) {
      const message = (error as AxiosError).message;
      Toast.show({ type: 'error', text1: 'Error', text2: message });
      dispatch(findOrCreateConversationAction.fail(error.message));
    }
  },
  {
    start: (): ChatsActions => ({
      type: ActionTypes.FIND_OR_CREATE_CONVERSATION_START,
    }),
    success: (
      conversation: IConversation,
      shouldAppend: boolean
    ): ChatsActions => ({
      type: ActionTypes.FIND_OR_CREATE_CONVERSATION_SUCCESS,
      conversation,
      shouldAppend,
    }),
    fail: (error: string): ChatsActions => ({
      type: ActionTypes.FIND_OR_CREATE_CONVERSATION_FAIL,
      error,
    }),
  }
);

export const listConversationsAction = Object.assign(
  (page: IPage, restart = false): Action => async (dispatch, getState) => {
    dispatch(listConversationsAction.start());
    try {
      const session = getState().auth.session;

      if (!session) {
        throw new AxiosError('Unauthenticated user');
      }

      const { jwtToken } = session.accessToken;

      const data = await ChatService.listConversations(jwtToken, page);

      dispatch(listConversationsAction.success(data.items, data.next, restart));
    } catch (error) {
      logger(error);
      const message = (error as AxiosError).message;
      Toast.show({ type: 'error', text1: 'Error', text2: message });
      dispatch(listConversationsAction.fail(message));
    }
  },
  {
    start: (): ChatsActions => ({
      type: ActionTypes.LIST_CONVERSATIONS_START,
    }),
    success: (
      conversations: IConversation[],
      next: IPage | null,
      restart: boolean
    ): ChatsActions => ({
      type: ActionTypes.LIST_CONVERSATIONS_SUCCESS,
      conversations,
      restart,
      next,
    }),
    fail: (error: string): ChatsActions => ({
      type: ActionTypes.LIST_CONVERSATIONS_FAIL,
      error,
    }),
  }
);
