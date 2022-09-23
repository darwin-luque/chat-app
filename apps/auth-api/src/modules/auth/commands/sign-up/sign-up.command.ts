import { SignUpDto } from '../../dtos/sign-up.dto';

export class SignUpCommand {
  constructor(public readonly data: SignUpDto) {}
}
