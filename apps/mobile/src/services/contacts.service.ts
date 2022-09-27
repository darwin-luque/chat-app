import { IUser, IPaginationOutput, IPage } from '@chat-app/types';
import axios, { AxiosResponse } from 'axios';

const AUTH_API_URL = 'http://localhost:3001/api';

export class ContactsService {
  static async list(
    token: string,
    page: IPage,
    filter: string
  ): Promise<IPaginationOutput<IUser>> {
    const endpoint = `${AUTH_API_URL}/users`;
    const query = `?offset=${page.offset}&limit=${page.limit}${
      filter ? `&q=${filter}` : ''
    }`;
    const res: AxiosResponse<IPaginationOutput<IUser>> = await axios.get(
      endpoint + query,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  }

  static async get(token: string, id: string) {
    const endpoint = `${AUTH_API_URL}/users/${id}`;
    const res: AxiosResponse<IUser> = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
}
