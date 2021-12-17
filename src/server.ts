import fastify from 'fastify';
import { userRoutes } from './routes/user.route';
import { taskRoutes } from './routes/task.route';
import { boardRoutes } from './routes/board.route';

const server = fastify();

server.register(userRoutes);
server.register(taskRoutes);
server.register(boardRoutes);

const start = async () => {
  try {
    await server.listen(4000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
