import uuid from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';

let { tasks } = require('../bd');

const getAllTasks = async () => {
  const boardId = req.url.split('/')[2];
  // @ts-ignore
  const tasksByBoard = tasks.find((task) => task.boardId === boardId);
  if (!tasksByBoard)
    return reply.code(404).send({ message: 'Tasks not found' });
  return reply.code(200).type('json').send(tasksByBoard);
};

const getOneTask = async () => {
  const id = req.url.split('/')[4];
  // @ts-ignore
  const task = tasks.find((item) => item.id === id);
  if (!task) return reply.code(404).send({ message: 'Task not found' });
  reply.code(200).send(task);
  return task;
};

const addTask = async () => {
  const boardId = req.url.split('/')[2];
  const id = uuid.v4();
  // @ts-ignore
  const newTask = { ...req.body };
  newTask.id = id;
  newTask.boardId = boardId;
  tasks.push(newTask);
  reply.code(201).send(newTask);
};

const updateTask = async () => {
  const boardId = req.url.split('/')[2];
  const id = req.url.split('/')[4];
  // @ts-ignore
  if (!tasks.find((task) => task.id === id && task.boardId === boardId))
    return reply.code(404).send();
  // @ts-ignore
  tasks = tasks.map((task) => {
    if (task.id === id && task.boardId === boardId) {
      return {
        id,
        // @ts-ignore
        ...req.body,
      };
    }
    return task;
  });
  return {
    id,
    // @ts-ignore
    ...req.body,
  };
};

const deleteTask = async () => {
  const id = req.url.split('/')[4];
  // @ts-ignore
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
