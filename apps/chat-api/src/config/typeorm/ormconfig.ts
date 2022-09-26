import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'test',
  password: process.env.DB_PASSWORD ?? 'test',
  database: process.env.DB_NAME ?? 'test',
  synchronize: process.env.NODE_ENV === 'development',
  autoLoadEntities: true,
  logging: false,
  entities: ['dist/apps/chat-api/**/*.entity.js'],
  migrations: ['dist/apps/chat-api/**/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(ormconfig as DataSourceOptions);
