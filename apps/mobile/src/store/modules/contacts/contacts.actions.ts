import { ThunkAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { IUser, IPage } from '@chat-app/types';
import { AxiosError } from 'axios';
import { ActionTypes } from '../../../constants';
import { RootState } from '../../index';
import { ContactsAction } from './contacts.types';
import { ContactsService } from '../../../services/contacts.service';
import { logger } from '../../../utils';

type Action = ThunkAction<void, RootState, unknown, ContactsAction>;

export const listContactsAction = Object.assign(
  (page: IPage, filter = '', restart = false): Action => async (
    dispatch,
    getState
  ) => {
    const token = getState().auth.session?.accessToken.jwtToken;

    dispatch(listContactsAction.start());
    try {
      if (!token) {
        throw new AxiosError('Authenticate first');
      }

      const data = await ContactsService.list(token, page, filter);

      dispatch(listContactsAction.success(data.items, data.next, restart));
    } catch (err) {
      logger(err);
      const message = (err as AxiosError).message;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      dispatch(listContactsAction.fail(message));
    }
  },
  {
    start: (): ContactsAction => ({ type: ActionTypes.LIST_CONTACTS_START }),
    success: (
      contacts: IUser[],
      next: IPage | null,
      restart: boolean
    ): ContactsAction => ({
      type: ActionTypes.LIST_CONTACTS_SUCCESS,
      contacts,
      next,
      restart,
    }),
    fail: (error: string): ContactsAction => ({
      type: ActionTypes.LIST_CONTACTS_FAIL,
      error,
    }),
  }
);

export const getContactAction = Object.assign(
  (id: string): Action => async (dispatch, getState) => {
    const token = getState().auth.session?.accessToken.jwtToken;
    const contacts = getState().contacts.contacts;

    dispatch(getContactAction.start());
    try {
      const localContact = contacts?.find((contact) => contact.id === id);

      if (localContact) {
        dispatch(getContactAction.success(localContact, false));
        return;
      }

      if (!token) {
        throw new AxiosError('Authenticate first');
      }

      const contact = await ContactsService.get(token, id);

      dispatch(getContactAction.success(contact, true));
    } catch (err) {
      logger(err);
      const message = (err as AxiosError).message;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      dispatch(getContactAction.fail(message));
    }
  },
  {
    start: (): ContactsAction => ({ type: ActionTypes.GET_CONTACT_START }),
    success: (contact: IUser, shouldAppend: boolean): ContactsAction => ({
      type: ActionTypes.GET_CONTACT_SUCCESS,
      shouldAppend,
      contact,
    }),
    fail: (error: string): ContactsAction => ({
      type: ActionTypes.GET_CONTACT_FAIL,
      error,
    }),
  }
);
