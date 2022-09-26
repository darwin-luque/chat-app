import { Expose } from 'class-transformer';

export class MessageDto {
  @Expose()
  id: string;

  @Expose()
  user: string;

  @Expose()
  body: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
