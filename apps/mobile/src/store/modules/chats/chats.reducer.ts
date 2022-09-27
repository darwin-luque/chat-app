import { Reducer } from '@reduxjs/toolkit';
import { ActionTypes, firstPage } from '../../../constants';
import { ChatsActions, ChatsState } from './chats.types';
import { appendArrayWithNewOnly } from '../../../utils';

const initialState: ChatsState = {
  conversations: null,
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
            ? [...(state.conversations ?? []), action.conversation]
            : state.conversations,
        currentConversation: action.conversation ?? null,
      };
    case ActionTypes.FIND_OR_CREATE_CONVERSATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    case ActionTypes.LIST_CONVERSATIONS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.LIST_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        conversations: action.restart
          ? action.conversations ?? []
          : appendArrayWithNewOnly(
              state.conversations ?? [],
              action.conversations ?? []
            ),
        next: action.next ?? null,
      };
    case ActionTypes.LIST_CONVERSATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    case ActionTypes.SELECT_CONVERSATION:
      return {
        ...state,
        currentConversation: action.conversation ?? null,
      };
    default:
      return state;
  }
};
