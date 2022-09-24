import { Reducer } from '@reduxjs/toolkit';
import { ActionTypes } from '../../constants/action-types.enum';
import { AuthAction, AuthState } from './auth.types';

const initialState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return Object.assign(state, {
        loading: true,
      });
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign(state, {
        loading: false,
        session: action.session ?? null,
      });
    case ActionTypes.LOGIN_FAIL:
      return Object.assign(state, {
        loading: false,
        error: action.error ?? null,
      });
    default:
      return state;
  }
};
