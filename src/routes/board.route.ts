import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import verifyToken from '../middlewares/verifyToken';
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

/**
 * Board routes
 *
 * @param Server (type: Fastify Instance)
 * @returns Promise (void)
 */
export const boardRoutes: FastifyPluginAsync = async (
  server: FastifyInstance
): Promise<void> => {
  server.get(
    '/boards',
    { preHandler: verifyToken, schema: getAllBoardsSchema },
    getAllBoards
  );
  server.get(
    '/boards/:id',
    { preHandler: verifyToken, schema: getOneBoardSchema },
    // @ts-ignore
    getOneBoard
  );
  server.post(
    '/boards',
    { preHandler: verifyToken, schema: addBoardSchema },
    // @ts-ignore
    addBoard
  );
  server.put(
    '/boards/:id',
    { preHandler: verifyToken, schema: updateBoardSchema },
    // @ts-ignore
    updateBoard
  );
  server.delete(
    '/boards/:id',
    { preHandler: verifyToken, schema: deleteBoardSchema },
    // @ts-ignore
    deleteBoard
  );
};
