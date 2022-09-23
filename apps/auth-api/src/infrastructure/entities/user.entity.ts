import { Base } from '@chat-app/nest-utils';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends Base {
  @Column({ name: 'username', type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true })
  picture?: string;
}
