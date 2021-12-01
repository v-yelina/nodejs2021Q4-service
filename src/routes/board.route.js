const {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/board.controller');
const {
  getBoardValidation,
  addBoardValidation,
} = require('../models/board.model');

const boardRoutes = [
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
