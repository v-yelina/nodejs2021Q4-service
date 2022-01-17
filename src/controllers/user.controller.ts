import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  IUser,
  INewUser,
  IUserUpdate,
  IUserLogin,
} from '../interfaces/user.interfaces';
import { EUser } from '../entity/user.entity';
import ENV from 'src/common/config';

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
  const user: EUser | undefined = await getRepository(EUser).findOne({
    where: { id },
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
  const data = {
    ...request.body,
    password: bcrypt.hashSync(request.body.password, 8),
  };
  const newUser: INewUser | undefined = { id: uuid(), ...data };
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
  const updatedUser: IUser = { id, ...data };

  const updUser = await getRepository(EUser).update(
    { id },
    {
      ...data,
    }
  );

  return updUser.affected
    ? reply.status(200).send(updatedUser)
    : reply.status(404).send('User with such id is not found');
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

  const delUser = await getRepository(EUser).delete({
    id,
  });
  return delUser.affected
    ? reply.status(204).send()
    : reply.status(404).send('User with such ID was not found');
}

export async function login(
  request: FastifyRequest<{ Body: IUserLogin }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const login: string = request.body.login;
  const user: EUser | undefined = await getRepository(EUser).findOne({
    where: { login },
  });
  if (!user) {
    return reply
      .status(401)
      .send({ token: null, message: 'User not found or Incorrect password' });
  }

  const passwordIsValid = bcrypt.compareSync(
    request.body.password,
    user.password as string
  );

  if (!passwordIsValid) {
    return reply
      .status(401)
      .send({ token: null, message: 'User not found or Incorrect password' });
  }

  const token = jwt.sign(
    { id: user.id, login: user.login },
    ENV.JWT_SECRET_KEY as string,
    {
      expiresIn: 86400, // in sec => 24 hours
    }
  );

  reply.send({
    id: user.id,
    name: user.name,
    login: user.login,
    accessToken: token,
  });
}
