import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUserLogin } from '../interfaces/user.interfaces';
import { EUser } from '../entity/user.entity';
import ENV from 'src/common/config';

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
      .status(403)
      .send({ token: null, message: 'User not found or Incorrect password' });
  }

  const passwordIsValid = bcrypt.compareSync(
    request.body.password,
    user.password as string
  );

  if (!passwordIsValid) {
    return reply
      .status(403)
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
    token: token,
  });
}
