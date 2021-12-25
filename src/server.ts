import fastify from 'fastify';
import ENV from './common/config';
import { userRoutes } from './routes/user.route';
import { taskRoutes } from './routes/task.route';
import { boardRoutes } from './routes/board.route';
import { logger } from './logger';

const server = fastify({
  logger,
});

server.register(userRoutes);
server.register(taskRoutes);
server.register(boardRoutes);

server.addHook('preHandler', function (req, _reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  done();
});

process.on('uncaughtException', (err) => {
  server.close();
  server.log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  server.close();
  server.log.error(err);
  process.exit(1);
});

const start = async () => {
  try {
    await server.listen(ENV.PORT as string);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
