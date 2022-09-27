import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { mapUserToTokenUserMetadata } from '@chat-app/utils';
import { Session, ITokenPayload } from '@chat-app/types';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { RefreshCommand } from './refresh.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: RefreshCommand): Promise<Session> {
    const user = await this.usersRepository.findOneBy({
      id: command.id,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    const token = await this.jwtService.signAsync(
      mapUserToTokenUserMetadata(user)
    );
    const payload = this.jwtService.decode(token) as ITokenPayload;

    return { attributes: user, accessToken: { jwtToken: token, payload } };
  }
}
