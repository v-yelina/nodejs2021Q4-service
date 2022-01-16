import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IBoard,
  INewBoard,
  IBoardUpdate,
} from '../interfaces/board.interfaces';
import { boards, tasks } from '../bd';

/**
 * Returns all boards
 *
 * @param _request - Client request (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Array of all boards
 *
 */
export async function getAllBoards(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.code(200).send(boards);
}

/**
 * Returns the board with a given id.
 *
 * @param request - Request with the id of a board which should be found (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Board with given id or error message when board wasn't found
 *
 */
export async function getOneBoard(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      columns: {
        id: string;
        title: string;
        order: number;
      };
    }
  | undefined
> {
  const id = request.url.split('/')[2];
  const board = boards.find((b) => b.id === id);
  if (!board)
    return reply
      .code(404)
      .send({ message: 'Board with such ID was not found' });
  return reply.code(200).send(board);
}

/**
 * Adds new board to database.
 *
 * @param request - Request which body contains new board data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Created board
 *
 */
export async function addBoard(
  request: FastifyRequest<{ Body: IBoardUpdate }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      columns: {
        id: string;
        title: string;
        order: number;
      }[];
    }
  | undefined
> {
  const data = request.body;
  const newBoard: INewBoard | undefined = { id: uuid(), ...data };
  boards.push(newBoard);
  return reply.code(201).send(newBoard);
}

/**
 * Updates board.
 *
 * @param request - Request with id of a board, which should be changed and which body contains new board's data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Updated board
 *
 */
export async function updateBoard(
  request: FastifyRequest<{ Params: { id: string }; Body: IBoardUpdate }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      columns: {
        id: string;
        title: string;
        order: number;
      }[];
    }
  | undefined
> {
  const { id } = request.params;
  const data = request.body;
  const indexToChange: number = boards.findIndex(
    (board: IBoard) => board.id === id
  );
  if (indexToChange === -1)
    return reply.code(404).send('Board with such id not found');
  const updatedBoard: IBoard = { id, ...data };
  boards.splice(indexToChange, 1, updatedBoard);

  return reply.status(200).send(updatedBoard);
}

/**
 * Deletes the board with a given id and board's tasks.
 *
 * @param request - Request with the id of board which should be deleted (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Status 204 without data
 *
 */
export async function deleteBoard(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      columns: {
        id: string;
        title: string;
        order: number;
      };
    }
  | undefined
> {
  const { id } = request.params;

  for (let i = 0; i < tasks.length; i + 1) {
    if (tasks[i].boardId === id) {
      tasks.splice(i, 1);
    }
  }

  const indexToDelete: number = boards.findIndex(
    (board: IBoard) => board.id === id
  );
  if (indexToDelete === -1) {
    return reply.status(404).send('Board with such ID was not found');
  }
  boards.splice(indexToDelete, 1);
  return reply.code(204).send();
}
