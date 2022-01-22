import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import verifyToken from '../middlewares/verifyToken';
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
    { preHandler: verifyToken, schema: getAllTasksByBoardSchema },
    getAllTasksByBoard
  );
  server.get(
    '/boards/:boardId/tasks/:id',
    { preHandler: verifyToken, schema: getOneTaskSchema },
    // @ts-ignore
    getOneTask
  );
  server.post(
    '/boards/:boardId/tasks',
    { preHandler: verifyToken, schema: addTaskSchema },
    // @ts-ignore
    addTask
  );
  server.put(
    '/boards/:boardId/tasks/:id',
    { preHandler: verifyToken, schema: updateTaskSchema },
    // @ts-ignore
    updateTask
  );
  server.delete(
    '/boards/:boardId/tasks/:id',
    { preHandler: verifyToken, schema: deleteTaskSchema },
    // @ts-ignore
    deleteTask
  );
};
