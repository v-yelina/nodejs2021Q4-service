import {userController} from "../controllers/user.controller.ts";
import {userSchema} from "../schemas/user.schema.ts";


export const userRoutes = (server, options, done) => {
  server.get('/users', { schema: userSchema.getAllUsersSchema, handler: userController.getAllUsers });
  server.get('/users/:id', { schema: userSchema.getOneUserSchema, handler: userController.getOneUser });
  server.post('/users', { schema: userSchema.addUserSchema, handler: userController.addUser });
  server.put('/users/:id', { schema: userSchema.updateUserSchema, handler: userController.updateUser });
  server.delete('/users/:id', { schema: userSchema.deleteUserSchema, handler: userController.deleteUser });
  done();
};
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

module.exports = userRoutes;
