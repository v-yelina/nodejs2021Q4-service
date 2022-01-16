import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import {
  getAllTasksByBoard,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';

import {
  addTaskSchema,
  deleteTaskSchema,
  getAllTasksByBoardSchema,
  getOneTaskSchema,
  updateTaskSchema,
} from '../schemas/task.schema';

/**
 * Task routes
 *
 * @param Server (type: Fastify Instance)
 * @returns Promise (void)
 */
export const taskRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.get(
    '/boards/:boardId/tasks',
    { schema: getAllTasksByBoardSchema },
    getAllTasksByBoard
  );
  server.get(
    '/boards/:boardId/tasks/:id',
    { schema: getOneTaskSchema },
    getOneTask
  );
  server.post('/boards/:boardId/tasks', { schema: addTaskSchema }, addTask);
  server.put(
    '/boards/:boardId/tasks/:id',
    { schema: updateTaskSchema },
    updateTask
  );
  server.delete(
    '/boards/:boardId/tasks/:id',
    { schema: deleteTaskSchema },
    deleteTask
  );
};
