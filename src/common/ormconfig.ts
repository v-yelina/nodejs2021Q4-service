import { ConnectionOptions } from 'typeorm';
import ENV from './config';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: ENV.POSTGRES_HOST,
  port:
    parseInt(ENV.POSTGRES_PORT as string, 10) ||
    parseInt(ENV.POSTGRES_EXTERNAL_PORT as string, 10) ||
    5432,
  database: ENV.POSTGRES_DB,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  entities: ['src/entity/*.ts'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
