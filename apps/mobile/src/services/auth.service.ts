import axios, { AxiosResponse } from 'axios';
import { Session } from '@chat-app/utils';
import { IUserInput } from '../types';

export class AuthService {
  static async register(data: IUserInput): Promise<Session> {
    const endpoint = 'http://localhost:3001/api/auth/sign-up';
    const res: AxiosResponse<Session> = await axios.post(endpoint, data);

    return res.data;
  }
}
