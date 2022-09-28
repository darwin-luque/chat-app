import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatsGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  users: Map<string, Socket> = new Map();

  handleDisconnect(client: Socket) {
    let key: string | undefined;
    this.logger.verbose('Client disconnected');
    // A client has disconnected
    for (const [id, socket] of this.users.entries()) {
      if (socket.id === client.id) key = id;
      break;
    }

    if (key) {
      // Remove user from users map
      this.users.delete(key);

      // Notify connected clients of current users
      this.server.emit('users', this.users);
    }
  }

  handleConnection() {
    this.logger.verbose('Client connected');
  }

  @SubscribeMessage('add-user')
  addUser(client: Socket, id: string) {
    this.logger.debug('add-user');
    // A client has connected
    this.users.set(id, client);
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  onChat(client: Socket, message: string) {
    console.log(this.users);
    console.log({ message });
  }
}
