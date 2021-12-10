const userController = require('../controllers/user.controller');

// export const addUser = async (req: FastifyRequest, reply:FastifyReply) => {

export const getAllUsersHandler = async (req, reply) => {
  if (!req?.params?.id) {
    const res = await userController.getAllUsers();
    reply.send(res);
  }
};

export const getOneUserHandler = async (req, reply) => {
  if (!req?.params?.id) {
    const res = await userController.getOneUser(req.params.id);
    if (res) {
      return reply.send(res);
    } else {
      return reply
        .status(404)
        .send({ message: 'User with such ID was not found' });
    }
  }
};

export const addUserHandler = async (req, reply) => {
  const res = await userController.addUser(req.body);
  reply.status(201).send(res);
};

export const updateUserHandler = async (req, reply) => {
  const res = await userController.updateUser(req?.params?.id, req.body);
  reply.send(res);
};

export const deleteUserHandler = async (req, reply) => {
  try {
    await userController.deleteUser(req?.params?.id);
  } catch {
    reply.status(404).send('User with such ID was not found');
  }
  reply.status(204).send();
};
