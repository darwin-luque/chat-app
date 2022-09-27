import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/auth.guard';
import { ormconfig } from './config/typeorm/ormconfig';
import { jwtconfig } from './config/jwt/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule.register(jwtconfig),
    ConversationsModule,
    MessagesModule,
  ],
  providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
