import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

interface IENV {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  JWT_SECRET_KEY: string | undefined;
  AUTH_MODE: boolean;
  LOG_LEVEL: string | undefined;
  POSTGRES_PORT: string | undefined;
  POSTGRES_EXTERNAL_PORT: string | undefined;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DB: string | undefined;
  POSTGRES_HOST: string | undefined;
}

const ENV: IENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_EXTERNAL_PORT: process.env.POSTGRES_EXTERNAL_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
};

export default ENV;
