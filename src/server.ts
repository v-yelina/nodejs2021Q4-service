// +const fastify = require('fastify')({ logger: true });
// const fastifyEnv = require('fastify-env');

import fastify from 'fastify'

const server = fastify()

// const schema = {
//   type: 'object',
//   required: ['PORT'],
//   properties: {
//     PORT: {
//       type: 'integer',
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

// fastify.register(fastifyEnv, options).ready((err) => {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// });

// + fastify.get('/', async (request, reply) => {
//   reply.send({ hello: 'This is Task-4 REST service' });
// });

server.get('/', async (request, reply) => {
  console.log(request.body);
  reply.code(200).send({message: 'This is Task-5 REST service'})
})

// const userRoutes = require('./routes/user.route');

// userRoutes.forEach((route) => {
//   fastify.route(route);
// });

// const boardRoutes = require('./routes/board.route');

// boardRoutes.forEach((route) => {
//   fastify.route(route);
// });

// const taskRoutes = require('./routes/task.route');

// taskRoutes.forEach((route) => {
//   fastify.route(route);
// });

// const start = async () => {
//   try {
//     await fastify.ready();
//     await fastify.listen(fastify.config.PORT);
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };
// start();
const start = async () => {
  try {
    await server.listen(4000, "0.0.0.0");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
