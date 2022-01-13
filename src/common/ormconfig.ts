import { ConnectionOptions } from 'typeorm';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = require('./config');

const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: ['src/**/*.model{.ts,.js}', 'build/**/*.model{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
