import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { login } from 'src/controllers/login.controller';
import { loginSchema } from 'src/schemas/login.schema';

export const loginRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.get('/login', { schema: loginSchema }, login);
};
