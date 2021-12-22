// add to env variables
// const logLevels = {
//   error: 50,
//   warn: 40,
//   info: 30,
//   debug: 20,
// };
import pino from 'pino';
import pinoms, { Streams } from 'pino-multi-stream';

const multistream = pinoms.multistream;

const errorLog = pino.destination('./log/error.log');
const allLog = pino.destination('./log/log.log');

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
    level: 'info', // from env
  },
  multistream(streams)
);
