import axios, { AxiosResponse } from 'axios';
import { IUserWithoutPassword, Session } from '@chat-app/utils';
import { IUserInput } from '../types';

export class AuthService {
  static async register(data: IUserInput): Promise<Session> {
    const endpoint = 'http://localhost:3001/api/auth/sign-up';
    const res: AxiosResponse<Session> = await axios.post(endpoint, data);

    return res.data;
  }

  static async login(data: IUserInput): Promise<Session> {
    const endpoint = 'http://localhost:3001/api/auth/sign-in';
    const res: AxiosResponse<Session> = await axios.post(endpoint, data);

    return res.data;
  }

  static async updateProfile(
    token: string,
    data: Partial<Omit<IUserInput, 'username'>>
  ): Promise<IUserWithoutPassword> {
    const endpoint = 'http://localhost:3001/api/users';
    const res: AxiosResponse<IUserWithoutPassword> = await axios.patch(
      endpoint,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  }
}
