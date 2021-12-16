import {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/board.controller';
import { boardSchema } from '../schemas/board.schema';
import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from 'fastify';

export const boardRoutes: FastifyPluginAsync = async (
  server: FastifyInstance,
  _opts: RouteShorthandOptions
): Promise<void> => {
  server.get(
    '/boards',
    { schema: boardSchema.getAllBoardsSchema },
    getAllBoards
  );
  server.get(
    '/boards/:id',
    { schema: boardSchema.getOneBoardSchema },
    getOneBoard
  );
  server.post('/boards', { schema: boardSchema.addBoardSchema }, addBoard);
  server.put(
    '/boards/:id',
    { schema: boardSchema.updateBoardSchema },
    updateBoard
  );
  server.delete(
    '/boards/:id',
    { schema: boardSchema.deleteBoardSchema },
    deleteBoard
  );
};
