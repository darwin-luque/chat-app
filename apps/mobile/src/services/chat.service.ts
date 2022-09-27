import {
  IConversation,
  IMessage,
  IPage,
  IPaginationOutput,
} from '@chat-app/types';
import axios, { AxiosResponse } from 'axios';

const CHAT_API_URL = 'http://localhost:3002/api';

export class ChatService {
  static async findOrCreateConversation(
    token: string,
    to: string
  ): Promise<IConversation> {
    const res: AxiosResponse<IConversation> = await axios.post(
      `${CHAT_API_URL}/conversations`,
      { to },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  static async listConversations(
    token: string,
    page: IPage
  ): Promise<IPaginationOutput<IConversation>> {
    const endpoint = `${CHAT_API_URL}/conversations`;
    const query = `?offset=${page.offset}&limit=${page.limit}`;
    const res: AxiosResponse<IPaginationOutput<
      IConversation
    >> = await axios.get(endpoint + query, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }

  static async sendMessage(
    token: string,
    conversationId: string,
    body: string
  ): Promise<IMessage> {
    const res: AxiosResponse<IMessage> = await axios.post(
      `${CHAT_API_URL}/conversations/${conversationId}/messages`,
      { body },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  static async listMessagesForConversation(
    token: string,
    conversationId: string,
    page: IPage
  ): Promise<IPaginationOutput<IMessage>> {
    const endpoint = `${CHAT_API_URL}/conversations/${conversationId}/messages`;
    const query = `?offset=${page.offset}&limit=${page.limit}`;
    const res: AxiosResponse<IPaginationOutput<IMessage>> = await axios.get(
      endpoint + query,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  }
}
