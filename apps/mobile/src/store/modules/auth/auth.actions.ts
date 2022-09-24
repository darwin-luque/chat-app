import { ThunkAction } from '@reduxjs/toolkit';
import { Session } from '@chat-app/utils';
import AsyncStorage from '@react-native-community/async-storage';
import { AxiosError } from 'axios';
import { RootState } from '../../index';
import { AuthAction } from './auth.types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { IUserInput } from '../../../types';
import { AuthService } from '../../../services/auth.service';
import { StorageKeys, ActionTypes } from '../../../constants';
import { logger } from '../../../../utils';

type Action = ThunkAction<void, RootState, unknown, AuthAction>;

export const checkForSessionAction = Object.assign(
  (): Action => async (dispatch) => {
    try {
      const sessionStr = await AsyncStorage.getItem(StorageKeys.Session);
      const session = sessionStr ? (JSON.parse(sessionStr) as Session) : null;
      if (session) {
        dispatch(checkForSessionAction.success(session));
      }
    } catch (error) {
      logger(error);
    }
  },
  {
    success: (session: Session): AuthAction => ({
      type: ActionTypes.CHECK_SESSION,
      session,
    }),
  }
);
export const registerAction = Object.assign(
  (data: IUserInput): Action => async (dispatch) => {
    dispatch(registerAction.start());
    try {
      const session = await AuthService.register(data);
      await AsyncStorage.setItem(StorageKeys.Session, JSON.stringify(session));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have successfully registered',
      });
      dispatch(registerAction.success(session));
    } catch (err) {
      logger(err);
      const message = (err as AxiosError).message;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      dispatch(registerAction.fail(message));
    }
  },
  {
    start: (): AuthAction => ({ type: ActionTypes.REGISTER_START }),
    success: (session: Session): AuthAction => ({
      type: ActionTypes.REGISTER_SUCCESS,
      session,
    }),
    fail: (error: string): AuthAction => ({
      type: ActionTypes.REGISTER_FAIL,
      error,
    }),
  }
);

export const loginAction = Object.assign(
  (data: IUserInput): Action => async (dispatch) => {
    dispatch(loginAction.start());
    try {
      const session = await AuthService.login(data);
      await AsyncStorage.setItem(StorageKeys.Session, JSON.stringify(session));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have successfully logged in',
      });
      dispatch(loginAction.success(session));
    } catch (err) {
      logger(err);
      const message = (err as AxiosError).message;
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      dispatch(loginAction.fail(message));
    }
  },
  {
    start: (): AuthAction => ({ type: ActionTypes.LOGIN_START }),
    success: (session: Session): AuthAction => ({
      type: ActionTypes.LOGIN_SUCCESS,
      session,
    }),
    fail: (error: string): AuthAction => ({
      type: ActionTypes.LOGIN_FAIL,
      error,
    }),
  }
);
