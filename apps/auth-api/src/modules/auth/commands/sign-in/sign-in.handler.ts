import { ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  mapUserToTokenUserMetadata,
  Session,
  ITokenPayload,
} from '@restaurant-app/utils';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignInCommand } from './sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: SignInCommand): Promise<Session> {
    const user = await this.usersRepository.findOneBy({
      email: command.data.email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${command.data.email} not found`
      );
    }

    const validPassword = await bcrypt.compare(
      command.data.password,
      user.password
    );

    if (!validPassword) {
      throw new ForbiddenException('Invalid password');
    }

    const token = await this.jwtService.signAsync(
      mapUserToTokenUserMetadata(user)
    );
    const payload = this.jwtService.decode(token) as ITokenPayload;

    return { attributes: user, accessToken: { jwtToken: token, payload } };
  }
}
