import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from 'fastify';
import {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';

import { taskSchema } from '../schemas/task.schema';

export const taskRoutes: FastifyPluginAsync = async (
  server: FastifyInstance,
  _opts: RouteShorthandOptions
): Promise<void> => {
  server.get(
    '/boards/:boardId/tasks',
    { schema: taskSchema.getOneTaskSchema },
    getAllTasks
  );
  server.get(
    '/boards/:boardId/tasks/:id',
    { schema: taskSchema.getOneTaskSchema },
    getOneTask
  );
  server.post(
    '/boards/:boardId/tasks',
    { schema: taskSchema.addTaskSchema },
    addTask
  );
  server.put(
    '/boards/:boardId/tasks/:id',
    { schema: taskSchema.updateTaskSchema },
    updateTask
  );
  server.delete(
    '/boards/:boardId/tasks/:id',
    { schema: taskSchema.deleteTaskSchema },
    deleteTask
  );
};
