import { Base } from '@chat-app/nest-utils';
import { IUser } from '@chat-app/utils';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends Base implements IUser {
  @Column({ name: 'username', type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  lastName?: string;

  @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true })
  picture?: string;
}
