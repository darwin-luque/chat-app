import { Socket, Server } from 'socket.io';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { ReceiveMessageDto } from './dtos/receive-message.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AppendMessageCommand } from './commands/append-message';
import { Message } from '../../infrastructure/entities/message.entity';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly commandBus: CommandBus) {}

  private readonly logger = new Logger(ChatsGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  private readonly users: Map<string, Socket> = new Map();

  handleDisconnect(client: Socket) {
    let key: string | undefined;
    this.logger.verbose('Client disconnected');
    // A client has disconnected
    for (const [id, socket] of this.users.entries()) {
      if (socket.id === client.id) {
        key = id;
        break;
      }
    }

    if (key) {
      this.users.delete(key);
      this.server.emit('users', this.users);
    }
  }

  handleConnection(client: Socket) {
    const id = client.handshake.query.userId;
    if (id && typeof id === 'string') {
      this.logger.debug('add-user', { user: id, client: client.id });
      this.users.set(id, client);
      this.server.emit('users', this.users);
      this.logger.verbose('Client connected');
    }
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @SubscribeMessage('send-message')
  async onChat(@MessageBody() message: ReceiveMessageDto): Promise<void> {
    const [savedMessage, users] = await this.commandBus.execute<
      AppendMessageCommand,
      [Message, string[]]
    >(new AppendMessageCommand(message));

    users.forEach((user) => {
      const userSocket = this.users.get(user);
      if (userSocket) {
        this.server.to(userSocket.id).emit('receive-message', savedMessage);
      }
    });
  }
}
