import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { jwtconfig } from './config/jwt/jwt.config';
import { ormconfig } from './config/typeorm/ormconfig';

@Module({
  imports: [JwtModule.register(jwtconfig), TypeOrmModule.forRoot(ormconfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
