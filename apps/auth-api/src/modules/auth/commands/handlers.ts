import { CreateSuperAdminHandler } from './create-super-admin';
import { CreateAdminHandler } from './create-admin';
import { SignInHandler } from './sign-in';
import { SignUpHandler } from './sign-up';

export const CommandHandlers = [
  CreateSuperAdminHandler,
  CreateAdminHandler,
  SignUpHandler,
  SignInHandler,
];
