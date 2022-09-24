import { Reducer } from '@reduxjs/toolkit';
import { ActionTypes } from '../../../constants';
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
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.CHECK_SESSION:
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.session ?? null,
      };
    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error ?? null,
      };
    default:
      return state;
  }
};
