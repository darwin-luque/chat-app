import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '@chat-app/nest-utils';
import { Session } from '@chat-app/utils';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '../../infrastructure/decorators/public.decorator';
import { SignInCommand } from './commands/sign-in';
import { SignUpCommand } from './commands/sign-up';
import { SessionDto } from './dtos/session.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('sign-up')
  @Serialize(SessionDto)
  @Public()
  signUp(@Body() body: SignUpDto): Promise<Session> {
    return this.commandBus.execute(new SignUpCommand(body));
  }

  @Post('sign-in')
  @Serialize(SessionDto)
  @Public()
  signIn(@Body() body: SignInDto): Promise<Session> {
    return this.commandBus.execute(new SignInCommand(body));
  }
}
