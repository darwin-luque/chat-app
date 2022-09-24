import { ThunkAction } from '@reduxjs/toolkit';
import { Session } from '@chat-app/utils';
import AsyncStorage from '@react-native-community/async-storage';
import { AxiosError } from 'axios';
import { ActionTypes } from '../../constants/action-types.enum';
import { RootState } from '../../index';
import { AuthAction } from './auth.types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { IUserInput } from '../../../types';
import { AuthService } from '../../../services/auth.service';
import { StorageKeys } from '../../../constants';
import { logger } from '../../../../utils';

export const registerAction = Object.assign(
  (
    data: IUserInput
  ): ThunkAction<void, RootState, unknown, AuthAction> => async (dispatch) => {
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
