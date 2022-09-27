import { Session } from '@chat-app/types';
import { ActionTypes } from '../../../constants';

export interface AuthState {
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface AuthAction {
  type: ActionTypes;
  session?: Session;
  error?: string;
}
