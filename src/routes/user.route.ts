import {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { userSchema } from '../schemas/user.schema';
import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from 'fastify';

export const userRoutes: FastifyPluginAsync = async (
  server: FastifyInstance,
  _opts: RouteShorthandOptions
): Promise<void> => {
  server.get('/users', { schema: userSchema.getAllUsersSchema }, getAllUsers);
  server.get('/users/:id', { schema: userSchema.getOneUserSchema }, getOneUser);
  server.post('/users', { schema: userSchema.addUserSchema }, addUser);
  server.put('/users/:id', { schema: userSchema.updateUserSchema }, updateUser);
  server.delete(
    '/users/:id',
    { schema: userSchema.deleteUserSchema },
    deleteUser
  );
};
