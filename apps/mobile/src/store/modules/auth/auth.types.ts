import { Session } from '@chat-app/utils';
import { ActionTypes } from '../../constants/action-types.enum';

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
