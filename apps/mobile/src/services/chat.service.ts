import axios, { AxiosResponse } from 'axios';
import { IConversation, IPaginationOutput } from '@chat-app/utils';

const CHAT_API_URL = 'http://localhost:3002/api';

export class ChatService {
  static async findOrCreateConversation(
    token: string,
    to: string
  ): Promise<IConversation> {
    const res: AxiosResponse<IConversation> = await axios.post(
      `${CHAT_API_URL}/conversation`,
      { to },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  static async listConversations(
    token: string
  ): Promise<IPaginationOutput<IConversation>> {
    const res: AxiosResponse<IPaginationOutput<
      IConversation
    >> = await axios.get(`${CHAT_API_URL}/conversation`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }

  static async sendMessage(
    token: string,
    conversationId: string,
    body: string
  ): Promise<IConversation> {
    const res: AxiosResponse<IConversation> = await axios.post(
      `${CHAT_API_URL}/conversation/${conversationId}/message`,
      { body },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  static async listMessagesForConversation(
    token: string,
    conversationId: string
  ): Promise<IPaginationOutput<IConversation>> {
    const res: AxiosResponse<IPaginationOutput<
      IConversation
    >> = await axios.get(`${CHAT_API_URL}/conversation/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
}
