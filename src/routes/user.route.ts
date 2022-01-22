import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import verifyToken from '../middlewares/verifyToken';
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
  server.get(
    '/users',
    { preHandler: verifyToken, schema: getAllUsersSchema },
    getAllUsers
  );
  server.get(
    '/users/:id',
    { preHandler: verifyToken, schema: getOneUserSchema },
    // @ts-ignore
    getOneUser
  );
  server.post(
    '/users',
    { preHandler: verifyToken, schema: addUserSchema },
    // @ts-ignore
    addUser
  );
  server.put(
    '/users/:id',
    { preHandler: verifyToken, schema: updateUserSchema },
    // @ts-ignore
    updateUser
  );
  server.delete(
    '/users/:id',
    { preHandler: verifyToken, schema: deleteUserSchema },
    // @ts-ignore
    deleteUser
  );
};
