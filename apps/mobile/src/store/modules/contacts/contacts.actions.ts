import { ThunkAction } from '@reduxjs/toolkit';
import { IUser } from '@chat-app/utils';
import { ActionTypes } from '../../../constants';
import { IPage } from '../../../types/api';
import { RootState } from '../../index';
import { ContactsAction } from './contacts.types';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { ContactsService } from '../../../services/contacts.service';

type Action = ThunkAction<void, RootState, unknown, ContactsAction>;

export const listContactsAction = Object.assign(
  (page: IPage): Action => async (dispatch) => {
    dispatch(listContactsAction.start());
    try {
      const data = await ContactsService.list(page);

      dispatch(listContactsAction.success(data.items, data.next));
    } catch (err) {
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
