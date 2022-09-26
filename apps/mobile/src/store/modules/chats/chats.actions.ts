import { ThunkAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { areEqual } from '@chat-app/utils';
import { AxiosError } from 'axios';
import { ActionTypes } from '../../../constants';
import { ChatService } from '../../../services/chat.service';
import { RootState } from '../../index';
import { ChatsActions, ConversationOnState } from './chats.types';

type Action = ThunkAction<void, RootState, unknown, ChatsActions>;

export const findOrCreateConversationAction = Object.assign(
  (to: string): Action => async (dispatch, getState) => {
    dispatch(findOrCreateConversationAction.start());
    try {
      const session = getState().auth.session;

      if (!session) {
        throw new AxiosError('Unauthenticated user');
      }

      const { jwtToken, payload } = session.accessToken;

      const localConversation = getState().chats.conversations.find(
        (conversation) => areEqual(conversation.members, [to, payload.sub])
      );

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

      dispatch(
        findOrCreateConversationAction.success(
          { ...foundConversation, messages: [] },
          true
        )
      );
    } catch (error) {
      const message = (error as AxiosError).message;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      dispatch(findOrCreateConversationAction.fail(error.message));
    }
  },
  {
    start: (): ChatsActions => ({
      type: ActionTypes.FIND_OR_CREATE_CONVERSATION_START,
    }),
    success: (
      conversation: ConversationOnState,
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
