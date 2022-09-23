import { Body, Controller, Post } from '@nestjs/common';
import { UserRole, Session } from '@restaurant-app/utils';
import { Serialize } from '@restaurant-app/nest-utils';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSuperAdminCommand } from './commands/create-super-admin';
import { CreateAdminCommand } from './commands/create-admin';
import { SignInCommand } from './commands/sign-in';
import { SignUpCommand } from './commands/sign-up';
import { Role } from '../../infrastructure/decorators/role.decorator';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { User } from '../../infrastructure/entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { SessionDto } from './dtos/session.dto';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create/super-admin')
  @Role(UserRole.SystemOwner)
  @Serialize(UserDto)
  createSuperAdmin(@Body() body: CreateAdminDto): Promise<User> {
    return this.commandBus.execute(new CreateSuperAdminCommand(body));
  }

  @Post('create/admin')
  @Role(UserRole.SuperAdmin)
  @Serialize(UserDto)
  createAdmin(@Body() body: CreateAdminDto): Promise<User> {
    return this.commandBus.execute(new CreateAdminCommand(body));
  }

  @Post('sign-up')
  @Serialize(SessionDto)
  signUp(@Body() body: SignUpDto): Promise<Session> {
    return this.commandBus.execute(new SignUpCommand(body));
  }

  @Post('sign-in')
  @Serialize(SessionDto)
  signIn(@Body() body: SignInDto): Promise<Session> {
    return this.commandBus.execute(new SignInCommand(body));
  }
}
