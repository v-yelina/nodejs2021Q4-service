import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser, INewUser, IUserUpdate } from '../interfaces/user.interfaces';
import { users, tasks } from '../bd';
import { EUser } from '../entity/user.entity';
import { ConnectionManager, getRepository } from 'typeorm';

/**
 * Returns all users
 *
 * @param _request - Client request (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Array of all users
 *
 */
export async function getAllUsers(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  // const res = users.length
  //   ? users.map((user: IUser) => ({
  //       id: user.id,
  //       name: user.name,
  //       login: user.login,
  //     }))
  //   : users;

  const res = await getRepository(EUser).find();

  return reply.code(200).send(res);
}

/**
 * Returns the user with a given id.
 *
 * @param request - Request with the id of user which should be found (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns User with given id (without password) or error message when user wasn't found
 *
 */
export async function getOneUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const { id } = request.params;
  // const user: IUser | undefined = users.find((us: IUser) => us.id === id);
  const user: EUser | undefined = await getRepository(EUser).findOne({
    where: { id: id },
  });
  return user
    ? reply.send({ id: user.id, name: user.name, login: user.login })
    : reply.status(404).send({ message: 'User with such ID was not found' });
}

/**
 * Adds new user to database.
 *
 * @param request - Request which body contains new user data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Created user without password
 *
 */
export async function addUser(
  request: FastifyRequest<{ Body: IUserUpdate }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const data = request.body;
  const newUser: INewUser | undefined = { id: uuid(), ...data };
  // users.push(newUser);
  await getRepository(EUser).insert([newUser]);
  return reply
    .status(201)
    .send({ id: newUser.id, name: newUser.name, login: newUser.login });
}

/**
 * Updates user.
 *
 * @param request - Request with id of a user, which should be changed and which body contains new user's data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Updated user
 *
 */
export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: IUserUpdate }>,
  reply: FastifyReply
): Promise<
  { name: string; id: string; login: string; password: string } | string
> {
  const { id } = request.params;
  const data = request.body;
  // const indexToChange: number = users.findIndex(
  //   (user: IUser) => user.id === id
  // );
  // if (indexToChange === -1)
  //   return reply.code(404).send('User with such id not found');
  const updatedUser: IUser = { id, ...data };
  // users.splice(indexToChange, 1, updatedUser);

  const update = await getRepository(EUser).update(
    { id: id },
    {
      ...data,
    }
  );

  return update.affected
    ? reply.code(200).send(reply.status(200).send(updatedUser))
    : reply.code(404).send('User with such id not found');

  // return reply.status(200).send(updatedUser);
}

/**
 * Deletes the user with a given id and unassigns user's tasks upon deletion.
 *
 * @param request - Request with the id of user which should be deleted (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Status 204 without data
 *
 */
export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const { id } = request.params;

  // for (let i = 0; i < tasks.length; i += 1) {
  //   if (tasks[i].userId === id) {
  //     tasks[i].userId = null;
  //   }
  // }

  // const indexToDelete: number = users.findIndex(
  //   (user: IUser) => user.id === id
  // );
  // if (indexToDelete === -1) {
  //   return reply.status(404).send('User with such ID was not found');
  // }
  // users.splice(indexToDelete, 1);

  const deleteUser = await getRepository(EUser).delete({
    id: id,
  });
  return deleteUser.affected
    ? reply.status(204).send()
    : reply.status(404).send('User with such ID was not found');

  // return reply.status(204).send();
}
