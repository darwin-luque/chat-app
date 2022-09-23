import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [...QueryHandlers],
})
export class UsersModule {}
