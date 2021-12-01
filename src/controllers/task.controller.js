const uuid = require('uuid');
let { tasks } = require('../bd');

const getAllTasks = async (req, reply) => {
  reply.code(200).send(tasks);
};

const getOneTask = async (req, reply) => {
  const id = req.url.split('/')[2];
  const task = tasks.find((us) => us.id === id);
  if (!task) return reply.code(404).send();
  reply.code(200).send(task);
  return task;
};

const addTask = async (req, reply) => {
  const id = uuid.v4();
  const newtask = {
    id,
    ...req.body,
  };
  tasks.push(newtask);
  reply.code(201).send(newtask);
};

const updateTask = async (req, reply) => {
  const { id } = req.params;
  if (!tasks.find((task) => task.id === id)) return reply.code(404).send();
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        id,
        ...req.body,
      };
    }
    return task;
  });
  return {
    id,
    ...req.body,
  };
};

const deleteTask = async (req, reply) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  reply.code(204).send();
};

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
};
