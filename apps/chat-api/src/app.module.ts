import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ormconfig } from './config/typeorm/ormconfig';
import { jwtconfig } from './config/jwt/jwt.config';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule.register(jwtconfig),
    ConversationsModule,
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
