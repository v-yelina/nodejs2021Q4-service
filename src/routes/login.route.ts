import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { userLogin } from '../controllers/login.controller';
import { loginSchema } from '../schemas/login.schema';

export const loginRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.post('/login', { schema: loginSchema }, userLogin);
};
