import { ThunkAction } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { IUser } from '@chat-app/utils';
import { AxiosError } from 'axios';
import { ActionTypes } from '../../../constants';
import { IPage } from '../../../types/api';
import { RootState } from '../../index';
import { ContactsAction } from './contacts.types';
import { ContactsService } from '../../../services/contacts.service';
import { logger } from '../../../utils';

type Action = ThunkAction<void, RootState, unknown, ContactsAction>;

export const listContactsAction = Object.assign(
  (page: IPage): Action => async (dispatch, getState) => {
    const token = getState().auth.session?.accessToken.jwtToken;

    dispatch(listContactsAction.start());
    try {
      if (!token) {
        throw new AxiosError('Authenticate first');
      }

      const data = await ContactsService.list(token, page);

      dispatch(listContactsAction.success(data.items, data.next));
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
    success: (contacts: IUser[], next: IPage | null): ContactsAction => ({
      type: ActionTypes.LIST_CONTACTS_SUCCESS,
      contacts,
      next,
    }),
    fail: (error: string): ContactsAction => ({
      type: ActionTypes.LIST_CONTACTS_FAIL,
      error,
    }),
  }
);
