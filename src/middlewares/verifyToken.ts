import jwt, { Secret } from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import ENV from '../common/config';

function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) {
  const header = request.headers.authorization;
  let token = '';
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    token = bearer[1];
  }

  if (!token) {
    return reply.status(401).send({
      message: 'No token provided',
    });
  }

  jwt.verify(token as string, ENV.JWT_SECRET_KEY as Secret, (err) => {
    if (err) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  });
  return done();
}

export default verifyToken;
