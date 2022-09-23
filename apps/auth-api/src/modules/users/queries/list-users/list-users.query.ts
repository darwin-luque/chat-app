import { ListUsersDto } from '../../dtos/list-users.dto';

export class ListUsersQuery {
  constructor(
    public readonly data: ListUsersDto,
    public readonly userId: string
  ) {}
}
