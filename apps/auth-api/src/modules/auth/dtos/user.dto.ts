import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  picture: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
