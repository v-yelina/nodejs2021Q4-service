import { ConnectionOptions } from 'typeorm';
import ENV from './config';
import { EUser } from '../user/user.entity';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: ENV.POSTGRES_HOST || '192.168.178.26',
  port:
    parseInt(ENV.POSTGRES_PORT as string, 10) ||
    parseInt(ENV.POSTGRES_EXTERNAL_PORT as string, 10) ||
    5432,
  database: ENV.POSTGRES_DB || 'postgres',
  username: ENV.POSTGRES_USER || 'postgres',
  password: ENV.POSTGRES_PASSWORD || 'password',
  entities: [EUser],
  synchronize: true,
  // migrationsRun: true,
  // migrations: ['../migrations/*.js'],
  // cli: {
  //   migrationsDir: '../migrations',
  // },
};

export default ormconfig;
