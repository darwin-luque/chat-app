import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: command.id });

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    Object.assign(user, command.data);

    return this.usersRepository.save(user);
  }
}
