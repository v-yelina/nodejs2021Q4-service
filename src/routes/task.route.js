// @ts-ignore

import {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';
// @ts-ignore

import {
  getTaskValidation,
  addTaskValidation,
  getTasksByBoardValidation,
} from '../schemas/task.schema';

export const taskRoutes = [
  {
    method: 'GET',
    url: '/boards/:boardId/tasks',
    schema: getTasksByBoardValidation,
    handler: getAllTasks,
  },
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:id',
    schema: getTaskValidation,
    handler: getOneTask,
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    schema: addTaskValidation,
    handler: addTask,
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:id',
    handler: updateTask,
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:id',
    handler: deleteTask,
  },
];

module.exports = taskRoutes;
