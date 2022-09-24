import { Reducer } from '@reduxjs/toolkit';
import { ActionTypes } from '../../../constants';
import { appendArrayWithNewOnly } from '../../../utils';
import { ContactsAction, ContactsState } from './contacts.types';

const initalState: ContactsState = {
  contacts: [],
  next: { offset: 0, limit: 20 },
  loading: false,
  error: null,
};

export const contactsReducer: Reducer<ContactsState, ContactsAction> = (
  state = initalState,
  action
) => {
  switch (action.type) {
    case ActionTypes.LIST_CONTACTS_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LIST_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: appendArrayWithNewOnly(state.contacts, action.contacts ?? []),
        next: action.next ?? null,
      };
    case ActionTypes.LIST_CONTACTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    default:
      return state;
  }
};
