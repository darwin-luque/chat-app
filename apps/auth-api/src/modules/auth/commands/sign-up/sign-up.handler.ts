import {
  Session,
  ITokenPayload,
  mapUserToTokenUserMetadata,
} from '@chat-app/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignUpCommand } from './sign-up.command';

export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: SignUpCommand): Promise<Session> {
    const hashedPassword = await bcrypt.hash(command.data.password, 10);

    const user = await this.usersRepository.save(
      this.usersRepository.create({
        ...command.data,
        password: hashedPassword,
      })
    );

    const token = await this.jwtService.signAsync(
      mapUserToTokenUserMetadata(user)
    );
    const payload = this.jwtService.decode(token) as ITokenPayload;

    return { attributes: user, accessToken: { jwtToken: token, payload } };
  }
}
