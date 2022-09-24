import { IUser } from '@chat-app/utils';
import { IPaginationOutput } from '@chat-app/utils';
import axios, { AxiosResponse } from 'axios';
import { IPage } from '../types/api';

export class ContactsService {
  static async list(
    token: string,
    page: IPage,
    filter: string
  ): Promise<IPaginationOutput<IUser>> {
    const endpoint = 'http://localhost:3001/api/users';
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
}
