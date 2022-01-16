import pino from 'pino';
import pinoms, { Streams } from 'pino-multi-stream';
import ENV from './common/config';

const { multistream } = pinoms;

const errorLog = pino.destination('./logs/error.log');
const allLog = pino.destination('./logs/log.log');

const streams: Streams = [
  { stream: process.stdout },
  { level: 'error', stream: errorLog },
  { stream: allLog },
];

export const logger = pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
    level: ENV.LOG_LEVEL,
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
        };
      },
    },
  },
  multistream(streams)
);
