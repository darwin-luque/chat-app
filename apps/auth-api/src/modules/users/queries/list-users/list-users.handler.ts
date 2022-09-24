import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_ORDER,
} from '@chat-app/nest-utils';
import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityPropertyNotFoundError, Not, Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { ListUsersQuery } from './list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(query: ListUsersQuery): Promise<[User[], number]> {
    console.log({ [query.data.field]: query.data.order });
    try {
      return this.usersRepository.findAndCount({
        where: { id: Not(query.userId) },
        order: {
          [query.data.field ?? 'username']: query.data.order ?? DEFAULT_ORDER,
        },
        skip: query.data.offset ?? DEFAULT_OFFSET,
        take: query.data.limit ?? DEFAULT_LIMIT,
      });
    } catch (error) {
      // Find a way to globally handle this error
      if (error instanceof EntityPropertyNotFoundError) {
        throw new BadRequestException(`Invalid field: ${query.data.field}`);
      }
      throw error;
    }
  }
}
