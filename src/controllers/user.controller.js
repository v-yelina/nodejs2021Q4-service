const uuid = require('uuid');
let { users, tasks } = require('../bd');

const getAllUsers = async (req, reply) => {
  reply.code(200).send(
    users.length
      ? users.map((user) => ({
          id: user.id,
          name: user.name,
          login: user.login,
        }))
      : users
  );
};

const getOneUser = async (req, reply) => {
  const id = req.url.split('/')[2];
  const user = users.find((us) => us.id === id);
  if (!user) return reply.code(404).send();
  return reply
    .code(200)
    .send({ id: user.id, name: user.name, login: user.login });
};

const addUser = async (req, reply) => {
  const id = uuid.v4();
  const newUser = {
    id,
    ...req.body,
  };
  users.push(newUser);
  reply.code(201).send(newUser);
};

const updateUser = async (req, reply) => {
  const { id } = req.params;
  if (!users.find((user) => user.id === id)) return reply.code(404).send();
  users = users.map((user) => {
    if (user.id === id) {
      return {
        id,
        ...req.body,
      };
    }
    return user;
  });
  return {
    id,
    ...req.body,
  };
};

const deleteUser = async (req, reply) => {
  const { id } = req.params;
  tasks = tasks.map((task) => {
    if (task.userId === id) {
      return {
        ...task,
        userId: null,
      };
    }
    return task;
  });
  users = users.filter((user) => user.id !== id);
  reply.code(204).send();
};

module.exports = { getAllUsers, getOneUser, addUser, updateUser, deleteUser };
