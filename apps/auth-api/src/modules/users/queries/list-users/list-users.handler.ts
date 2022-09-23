import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { ListUsersQuery } from './list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(query: ListUsersQuery): Promise<[User[], number]> {
    console.log(query);
    return this.usersRepository.findAndCount({
      where: { id: Not(query.userId) },
      skip: query.data.offset,
      take: query.data.limit,
    });
  }
}
