import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IUser, INewUser, IUserUpdate } from '../interfaces/user.interfaces';
import { users, tasks } from '../bd';

export async function getAllUsers(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const res = users.length
    ? users.map((user: IUser) => ({
        id: user.id,
        name: user.name,
        login: user.login,
      }))
    : users;
  return reply.code(200).send(res);
}

/**
 * Returns the user with a given id.
 *
 *
 * @param id - The id of user which should be found
 * @returns IUser with given id (without password)
 *
 */
export async function getOneUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const { id } = request.params;
  const user: IUser | undefined = users.find((us: IUser) => us.id === id);
  if (user) {
    return reply.send({ id: user.id, name: user.name, login: user.login });
  }
  return reply.status(404).send({ message: 'User with such ID was not found' });
}

/**
 * Add new user to database.
 *
 *
 * @param data - New user data
 * @returns newUser - created user
 *
 */
export async function addUser(
  request: FastifyRequest<{ Body: IUserUpdate }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const data = request.body;
  const newUser: INewUser | undefined = { id: uuid(), ...data };
  users.push(newUser);
  return reply
    .status(201)
    .send({ id: newUser.id, name: newUser.name, login: newUser.login });
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: IUserUpdate }>,
  reply: FastifyReply
): Promise<
  { name: string; id: string; login: string; password: string } | string
> {
  const { id } = request.params;
  const data = request.body;
  const indexToChange: number = users.findIndex(
    (user: IUser) => user.id === id
  );
  if (indexToChange === -1)
    return reply.code(404).send('User with such id not found');
  const updatedUser: IUser = { id, ...data };
  users.splice(indexToChange, 1, updatedUser);

  return reply.status(200).send(updatedUser);
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const { id } = request.params;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].userId === id) {
      tasks[i].userId = null;
    }
  }

  const indexToDelete: number = users.findIndex(
    (user: IUser) => user.id === id
  );
  if (indexToDelete === -1) {
    return reply.status(404).send('User with such ID was not found');
  }
  users.splice(indexToDelete, 1);

  return reply.status(204).send();
}
