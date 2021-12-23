import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ITask, INewTask, ITaskUpdate } from '../interfaces/task.interfaces';
import { tasks } from '../bd';

/**
 * Returns all tasks of a board with given id
 *
 * @param request - Client request with board id (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Array of all tasks or error message when tasks wasn't found
 *
 */
export async function getAllTasksByBoard(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const boardId = request.url.split('/')[2];
  const tasksByBoard = tasks.filter((task) => task.boardId === boardId);
  if (!tasksByBoard)
    return reply.code(404).send({ message: 'Tasks not found' });
  return reply.code(200).send(tasksByBoard);
}

/**
 * Returns a task with a given id
 *
 * @param request - Client request with task id (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Task with given id or error message when user wasn't found
 *
 */
export async function getOneTask(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string | null;
      boardId: string | null;
      columnId: string | null;
    }
  | undefined
> {
  const id = request.url.split('/')[4];
  const task = tasks.find((item) => item.id === id);
  if (!task) return reply.code(404).send({ message: 'Task not found' });

  return reply.code(200).send(task);
}

/**
 * Adds new task to board with given id.
 *
 * @param request - Request with board id and which body contains new task data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Created task
 *
 */
export async function addTask(
  request: FastifyRequest<{
    Body: ITaskUpdate;
  }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string | null;
      boardId: string | null;
      columnId: string | null;
    }
  | undefined
> {
  const boardId = request.url.split('/')[2];
  const data = request.body;
  const newTask: INewTask | undefined = {
    id: uuid(),
    ...data,
    boardId,
  };
  console.log(tasks);
  tasks.push(newTask);
  console.log(tasks);

  return reply.code(201).send(newTask);
}

/**
 * Updates task.
 *
 * @param request - Request with id of a task, which should be changed and which body contains new task's data (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Updated task
 *
 */
export async function updateTask(
  request: FastifyRequest<{ Params: { id: string }; Body: ITaskUpdate }>,
  reply: FastifyReply
): Promise<
  { name: string; id: string; login: string; password: string } | string
> {
  const id = request.url.split('/')[4];
  const data = request.body;
  const indexToChange: number = tasks.findIndex(
    (task: ITask) => task.id === id
  );
  if (indexToChange === -1) {
    return reply.code(404).send('Task with such id not found');
  }
  const updatedTask: ITask = { id, ...data };
  tasks.splice(indexToChange, 1, updatedTask);

  return reply.status(200).send(updatedTask);
}

/**
 * Deletes the task with a given id.
 *
 * @param request - Request with the id of a task which should be deleted (type: FastifyRequest)
 * @param reply - Server reply (type: FastifyReply)
 * @returns Status 204 without data
 *
 */
export async function deleteTask(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<
  | {
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string | null;
      boardId: string | null;
      columnId: string | null;
    }
  | undefined
> {
  const id = request.url.split('/')[4];
  const indexToDelete: number = tasks.findIndex(
    (task: ITask) => task.id === id
  );
  if (indexToDelete === -1) {
    return reply.status(404).send('User with such ID was not found');
  }
  tasks.splice(indexToDelete, 1);
  return reply.code(204).send();
}
