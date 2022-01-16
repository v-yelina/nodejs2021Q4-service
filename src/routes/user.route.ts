import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import {
  addUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getOneUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';

/**
 * User routes
 *
 * @param Server (type: Fastify Instance)
 * @returns Promise (void)
 */
export const userRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.get('/users', { schema: getAllUsersSchema }, getAllUsers);
  server.get('/users/:id', { schema: getOneUserSchema }, getOneUser);
  server.post('/users', { schema: addUserSchema }, addUser);
  server.put('/users/:id', { schema: updateUserSchema }, updateUser);
  server.delete('/users/:id', { schema: deleteUserSchema }, deleteUser);
};
