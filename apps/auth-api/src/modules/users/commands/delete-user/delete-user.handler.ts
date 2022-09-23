import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: command.id });

    if (!user) {
      throw new NotFoundException(`User with id ${command.id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}
