import axios, { AxiosResponse } from 'axios';
import { IUserWithoutPassword, Session } from '@chat-app/types';
import { IUserInput } from '../types';

const AUTH_API_URL = 'http://localhost:3001/api';

export class AuthService {
  static async register(data: IUserInput): Promise<Session> {
    const endpoint = `${AUTH_API_URL}/auth/sign-up`;
    const res: AxiosResponse<Session> = await axios.post(endpoint, data);

    return res.data;
  }

  static async login(data: IUserInput): Promise<Session> {
    const endpoint = `${AUTH_API_URL}/auth/sign-in`;
    const res: AxiosResponse<Session> = await axios.post(endpoint, data);

    return res.data;
  }

  static async updateProfile(
    token: string,
    data: Partial<Omit<IUserInput, 'username'>>
  ): Promise<IUserWithoutPassword> {
    const endpoint = `${AUTH_API_URL}/users`;
    const res: AxiosResponse<IUserWithoutPassword> = await axios.patch(
      endpoint,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  }
}
