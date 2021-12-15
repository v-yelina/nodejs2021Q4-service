import fastify, { FastifyInstance } from 'fastify';
import {userRoutes} from './routes/user.route';
import { taskRoutes } from './routes/task.route';
import { boardRoutes } from './routes/board.route';


const server = fastify()

// const schema = {
//   type: 'object',
//   required: ['PORT'],
//   properties: {
//     PORT: {
//       type: 'number',
//       default: 3000,
//     },
//   },
// };

// const options = {
//   confKey: 'config',
//   schema,
//   dotenv: true,
//   data: process.env,
// };


server.register(userRoutes);
// server.register(taskRoutes);
// server.register(boardRoutes);


const start = async () => {
  try {
    await server.listen(4000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
