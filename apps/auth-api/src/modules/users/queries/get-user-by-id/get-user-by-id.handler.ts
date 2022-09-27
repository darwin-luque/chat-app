import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.usersRepository.findOneBy(query);

    if (!user) {
      throw new NotFoundException(`User with id ${query.id} not found`);
    }

    return user;
  }
}
