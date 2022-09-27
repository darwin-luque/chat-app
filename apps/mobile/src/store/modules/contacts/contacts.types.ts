import { IUser, IPage } from '@chat-app/types';
import { ActionTypes } from '../../../constants';

export interface ContactsState {
  contacts: IUser[] | null;
  next: IPage | null;
  loading: boolean;
  error: string | null;
}

export interface ContactsAction {
  type: ActionTypes;
  contacts?: IUser[];
  next?: IPage | null;
  error?: string;
  restart?: boolean;
}
