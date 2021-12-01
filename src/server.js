const app = require('fastify')({ logger: true });
const fastifyEnv = require('fastify-env');

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'integer',
      default: 3000,
    },
  },
};

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env,
};

app.register(fastifyEnv, options).ready((err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

app.get('/', async (request, reply) => {
  reply.send({ hello: 'This is Task-4 REST service' });
});

const userRoutes = require('./routes/user.route');

userRoutes.forEach((route) => {
  app.route(route);
});

const boardRoutes = require('./routes/board.route');

boardRoutes.forEach((route) => {
  app.route(route);
});

const start = async () => {
  try {
    await app.ready();
    await app.listen(app.config.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
