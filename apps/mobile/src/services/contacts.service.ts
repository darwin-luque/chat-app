import { IUser } from '@chat-app/utils';
import { PaginationOutputDto } from '@chat-app/nest-utils';
import axios, { AxiosResponse } from 'axios';
import { IPage } from '../types/api';

export class ContactsService {
  static async list(page: IPage): Promise<PaginationOutputDto<IUser>> {
    const endpoint = 'http://localhost:3001/api/users';
    const query = `?offset=${page.offset}&limit=${page.limit}`;
    const res: AxiosResponse<PaginationOutputDto<IUser>> = await axios.get(
      endpoint + query
    );

    return res.data;
  }
}
