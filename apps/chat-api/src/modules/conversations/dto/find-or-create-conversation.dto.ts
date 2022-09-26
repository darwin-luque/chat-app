import { IsUUID } from 'class-validator';

export class FindOrCreateConversationDto {
  @IsUUID()
  to: string;
}
