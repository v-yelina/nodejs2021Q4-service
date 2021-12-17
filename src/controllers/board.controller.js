const uuid = require('uuid');
let { boards } = require('../bd');
let { tasks } = require('../bd');

const getAllBoards = async (req, reply) => {
  reply.code(200).send(boards);
};

const getOneBoard = async (req, reply) => {
  const id = req.url.split('/')[2];
  const board = boards.find((us) => us.id === id);
  if (!board) return reply.code(404).send();
  reply.code(200).send(board);
  return board;
};

const addBoard = async (req, reply) => {
  const id = uuid.v4();
  const newboard = {
    id,
    ...req.body,
  };
  boards.push(newboard);
  reply.code(201).send(newboard);
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  if (!boards.find((board) => board.id === id)) return reply.code(404).send();
  boards = boards.map((board) => {
    if (board.id === id) {
      return {
        id,
        ...req.body,
      };
    }
    return board;
  });
  return {
    id,
    ...req.body,
  };
};

const deleteBoard = async (req, reply) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.boardId !== id);
  boards = boards.filter((board) => board.id !== id);
  reply.code(204).send();
};

module.exports = {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
};
