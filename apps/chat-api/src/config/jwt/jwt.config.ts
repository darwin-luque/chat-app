import { JwtModuleOptions } from '@nestjs/jwt';

import * as dotenv from 'dotenv';

dotenv.config();

export const jwtconfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
