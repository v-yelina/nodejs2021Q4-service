import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUserLogin } from '../interfaces/user.interfaces';
import { EUser } from '../entity/user.entity';
import ENV from '../common/config';

export async function userLogin(
  request: FastifyRequest<{ Body: IUserLogin }>,
  reply: FastifyReply
): Promise<{ name: string; id: string; login: string } | undefined> {
  const { login } = request.body;
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

  const token = sign(
    { id: user.id, login: user.login },
    ENV.JWT_SECRET_KEY as string
  );

  reply.send({
    token,
  });
}
