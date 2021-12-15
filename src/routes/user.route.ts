import {getAllUsers, getOneUser, addUser, updateUser, deleteUser} from "../controllers/user.controller";
import {userSchema} from "../schemas/user.schema";
import { FastifyInstance, FastifyPluginAsync, FastifySchema, RouteShorthandOptions } from 'fastify';

export const userRoutes: FastifyPluginAsync = async (server: FastifyInstance, opts: RouteShorthandOptions): Promise<void> => {
  server.get('/users', {schema: userSchema.getAllUsersSchema}, getAllUsers);
  server.get('/users/:id', {schema: userSchema.getOneUserSchema}, getOneUser);
  server.post('/users', { schema: userSchema.addUserSchema}, addUser);
  server.put('/users/:id', { schema: userSchema.updateUserSchema}, updateUser);
  server.delete('/users/:id', { schema: userSchema.deleteUserSchema}, deleteUser);
};

// export default userRoutes;
// export const userRoutes = [
//   {
//     method: "GET",
//     url: "/users",
//     handler: userController.getAllUsers,
//     schema: userSchema.getAllUsersSchema
//   },
  // {
  //   method: "GET",
  //   url: "/users/:id",
  //   schema: userSchema.getOneUserSchema,
  //   handler: userController.getOneUser,
  // },
  // {
  //   method: "POST",
  //   url: "/users",
  //   schema: userSchema.addUserSchema,
  //   handler: userController.addUser,
  // },
  // {
  //   method: "PUT",
  //   url: "/users/:id",
  //   schema: userSchema.updateUserSchema,
  //   handler: userController.updateUser,
  // },
//   {
//     method: "DELETE",
//     url: "/users/:id",
//     schema: userSchema.deleteUserSchema,
//     handler: userController.deleteUser,
//   },
// ];

// module.exports = userRoutes;
