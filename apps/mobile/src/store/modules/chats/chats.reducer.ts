import { Reducer } from '@reduxjs/toolkit';
import { ActionTypes, firstPage } from '../../../constants';
import { ChatsActions, ChatsState } from './chats.types';

const initialState: ChatsState = {
  conversations: [],
  currentConversation: null,
  loading: false,
  error: null,
  next: firstPage,
};

export const chatsReducer: Reducer<ChatsState, ChatsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.FIND_OR_CREATE_CONVERSATION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FIND_OR_CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        conversations:
          action.shouldAppend && action.conversation
            ? [...state.conversations, action.conversation]
            : state.conversations,
        currentConversation: action.conversation ?? null,
      };
    case ActionTypes.FIND_OR_CREATE_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    default:
      return state;
  }
};
