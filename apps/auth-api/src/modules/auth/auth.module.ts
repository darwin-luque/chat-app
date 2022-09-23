import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../../infrastructure/entities/user.entity';
import { jwtconfig } from '../../config/jwt/jwt.config';
import { CommandHandlers } from './commands/handlers';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    JwtModule.register(jwtconfig),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
