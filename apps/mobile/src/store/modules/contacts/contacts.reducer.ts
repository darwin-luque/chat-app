import { Reducer } from '@reduxjs/toolkit';
import { ContactsAction, ContactsState } from './contacts.types';
import { ActionTypes, firstPage } from '../../../constants';
import { appendArrayWithNewOnly } from '../../../utils';

const initalState: ContactsState = {
  contacts: null,
  currentContact: null,
  next: firstPage,
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
        contacts: action.restart
          ? action.contacts ?? []
          : appendArrayWithNewOnly(state.contacts ?? [], action.contacts ?? []),
        next: action.next ?? null,
      };
    case ActionTypes.LIST_CONTACTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    case ActionTypes.GET_CONTACT_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts:
          action.shouldAppend && action.contact
            ? appendArrayWithNewOnly(state.contacts ?? [], [action.contact])
            : state.contacts,
        currentContact: action.contact ?? null,
      };
    case ActionTypes.GET_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    default:
      return state;
  }
};
