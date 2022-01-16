import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getRepository } from 'typeorm';
import { ITask, INewTask, ITaskUpdate } from '../interfaces/task.interfaces';
import { ETask } from '../entity/task.entity';

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
  const tasksByBoard = await getRepository(ETask).find({
    where: { boardId },
  });
  return !tasksByBoard
    ? reply.code(404).send({ message: 'Tasks not found' })
    : reply.code(200).send(tasksByBoard);
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
  const task = await getRepository(ETask).findOne({
    where: { id },
  });
  return !task
    ? reply.code(404).send({ message: 'Task not found' })
    : reply.code(200).send(task);
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
  await getRepository(ETask).insert([newTask]);

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
  const updatedTask: ITask = { id, ...data };

  const updTask = await getRepository(ETask).update(
    { id },
    {
      ...data,
    }
  );

  return updTask.affected
    ? reply.status(200).send(updatedTask)
    : reply.status(404).send('Task with such id is not found');
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

  const delTask = await getRepository(ETask).delete({
    id,
  });
  return delTask.affected
    ? reply.status(204).send()
    : reply.status(404).send('Task with such ID was not found');
}
