import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/board.controller';
import {
  addBoardSchema,
  deleteBoardSchema,
  getAllBoardsSchema,
  getOneBoardSchema,
  updateBoardSchema,
} from '../schemas/board.schema';

export const boardRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.get('/boards', { schema: getAllBoardsSchema }, getAllBoards);
  server.get('/boards/:id', { schema: getOneBoardSchema }, getOneBoard);
  server.post('/boards', { schema: addBoardSchema }, addBoard);
  server.put('/boards/:id', { schema: updateBoardSchema }, updateBoard);
  server.delete('/boards/:id', { schema: deleteBoardSchema }, deleteBoard);
};
