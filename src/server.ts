import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import ENV from './common/config';
import { userRoutes } from './routes/user.route';
import { taskRoutes } from './routes/task.route';
import { boardRoutes } from './routes/board.route';
import { logger } from './logger';
import { request } from 'http';

const server = fastify({
  logger,
});

server.register(userRoutes);
server.register(taskRoutes);
server.register(boardRoutes);

server.setErrorHandler(
  (err: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
    if (+err.code > 500) {
      server.log.error(err);
      reply.status(+err.code || 500).send(err);
    }
  }
);

server.addHook('preHandler', (req, _reply, done) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  done();
});

process.on('uncaughtException', (err) => {
  server.close();
  server.log.fatal(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  server.close();
  server.log.fatal(err);
  process.exit(1);
});

server.get('/', (req, reply) => {
  reply.send({
    hello: "The default route isn't implemented yet, try /users or /boards",
  });
});

// throw Error('oops');

const start = async () => {
  try {
    await server.listen(ENV.PORT as string, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
