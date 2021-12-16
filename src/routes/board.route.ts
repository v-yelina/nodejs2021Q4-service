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
  opts: RouteShorthandOptions
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

// export const boardRoutes = [
//   {
//     method: 'GET',
//     url: '/boards',
//     handler: getAllBoards,
//   },
//   {
//     method: 'GET',
//     url: '/boards/:id',
//     schema: getBoardValidation,
//     handler: getOneBoard,
//   },
//   {
//     method: 'POST',
//     url: '/boards',
//     schema: addBoardValidation,
//     handler: addBoard,
//   },
//   {
//     method: 'PUT',
//     url: '/boards/:id',
//     handler: updateBoard,
//   },
//   {
//     method: 'DELETE',
//     url: '/boards/:id',
//     handler: deleteBoard,
//   },
// ];

// module.exports = boardRoutes;
