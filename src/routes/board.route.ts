// @ts-ignore

import {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/board.controller';
// @ts-ignore

import {
  getBoardValidation,
  addBoardValidation,
} from '../schemas/board.schema';

export const boardRoutes = [
  {
    method: 'GET',
    url: '/boards',
    handler: getAllBoards,
  },
  {
    method: 'GET',
    url: '/boards/:id',
    schema: getBoardValidation,
    handler: getOneBoard,
  },
  {
    method: 'POST',
    url: '/boards',
    schema: addBoardValidation,
    handler: addBoard,
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: updateBoard,
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: deleteBoard,
  },
];

module.exports = boardRoutes;
