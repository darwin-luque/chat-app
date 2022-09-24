import { IUser } from '@chat-app/utils';
import { ActionTypes } from '../../../constants';
import { IPage } from '../../../types/api';

export interface ContactsState {
  contacts: IUser[];
  next: IPage | null;
  loading: boolean;
  error: string | null;
}

export interface ContactsAction {
  type: ActionTypes;
  contacts?: IUser[];
  next?: IPage | null;
  error?: string;
}
