const {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');
const {
  getTaskValidation,
  addTaskValidation,
} = require('../models/task.model');

const taskRoutes = [
  {
    method: 'GET',
    url: '/boards/:boardId/tasks',
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
