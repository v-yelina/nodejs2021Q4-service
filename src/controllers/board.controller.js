import uuid from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';

let { boards } = require('../bd');
let { tasks } = require('../bd');

const getAllBoards = async () => {
  reply.code(200).send(boards);
};

const getOneBoard = async () => {
  const id = req.url.split('/')[2];
  // @ts-ignore
  const board = boards.find((us) => us.id === id);
  if (!board) return reply.code(404).send();
  reply.code(200).send(board);
  return board;
};

const addBoard = async () => {
  const id = uuid.v4();
  const newboard = {
    id,
    // @ts-ignore
    ...req.body,
  };
  boards.push(newboard);
  reply.code(201).send(newboard);
};

const updateBoard = async () => {
  // @ts-ignore

  const { id } = req.params;
  // @ts-ignore

  if (!boards.find((board) => board.id === id)) return reply.code(404).send();
  // @ts-ignore

  boards = boards.map((board) => {
    if (board.id === id) {
      return {
        id,
        // @ts-ignore

        ...req.body,
      };
    }
    return board;
  });
  return {
    id,
    // @ts-ignore

    ...req.body,
  };
};

const deleteBoard = async () => {
  // @ts-ignore

  const { id } = req.params;
  // @ts-ignore

  tasks = tasks.filter((task) => task.boardId !== id);
  // @ts-ignore

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
