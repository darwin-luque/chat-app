import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { mapUserToTokenUserMetadata } from '@chat-app/utils';
import { Session, ITokenPayload } from '@chat-app/types'
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignUpCommand } from './sign-up.command';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async execute(command: SignUpCommand): Promise<Session> {
    const foundUser = await this.usersRepository.findOne({
      where: { username: command.data.username },
    });

    if (foundUser) {
      throw new BadRequestException(
        `User with username ${command.data.username} already exists`
      );
    }

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
