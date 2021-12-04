const uuid = require('uuid');
let { tasks } = require('../bd');

const getAllTasks = async (req, reply) => {
  const boardId = req.url.split('/')[2];
  const tasksByBoard = tasks.find((task) => task.boardId === boardId);
  if (!tasksByBoard)
    return reply.code(404).send({ message: 'Tasks not found' });
  return reply.code(200).type('json').send(tasksByBoard);
};

const getOneTask = async (req, reply) => {
  const id = req.url.split('/')[4];
  const task = tasks.find((item) => item.id === id);
  if (!task) return reply.code(404).send({ message: 'Task not found' });
  reply.code(200).send(task);
  return task;
};

const addTask = async (req, reply) => {
  const boardId = req.url.split('/')[2];
  const id = uuid.v4();
  const newTask = { ...req.body };
  newTask.id = id;
  newTask.boardId = boardId;
  tasks.push(newTask);
  reply.code(201).send(newTask);
};

const updateTask = async (req, reply) => {
  const boardId = req.url.split('/')[2];
  const id = req.url.split('/')[4];
  if (!tasks.find((task) => task.id === id && task.boardId === boardId))
    return reply.code(404).send();
  tasks = tasks.map((task) => {
    if (task.id === id && task.boardId === boardId) {
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
  const id = req.url.split('/')[4];
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
