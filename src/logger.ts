import ENV from './common/config';

import pino from 'pino';
// import pinoms, { Streams } from 'pino-multi-stream';

// const multistream = pinoms.multistream;

// const errorLog = pino.destination('./log/error.log');
// const allLog = pino.destination('./log/log.log');

// const streams: Streams = [
//   { stream: process.stdout },
//   { level: 'error', stream: errorLog },
//   { stream: allLog },
// ];

export const logger = pino(
  {
    prettyPrint: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
    level: ENV.LOG_LEVEL,
  }
  //   multistream(streams)
);
