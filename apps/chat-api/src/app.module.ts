import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ormconfig } from './config/typeorm/ormconfig';
import { jwtconfig } from './config/jwt/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule.register(jwtconfig),
    ConversationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
