import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SetTokenPayloadMiddleware } from './infrastructure/middlewares/set-token-payload.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ormconfig } from './config/typeorm/ormconfig';
import { jwtconfig } from './config/jwt/jwt.config';

@Module({
  imports: [
    AuthModule,
    JwtModule.register(jwtconfig),
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetTokenPayloadMiddleware).forRoutes('*');
  }
}
