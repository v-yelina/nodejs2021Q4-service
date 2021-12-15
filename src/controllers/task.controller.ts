import { ITask, INewTask, ITaskUpdate } from '../interfaces/task.interfaces';
import { tasks } from '../bd';
import { v4 as uuid } from 'uuid';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllTasks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const boardId = request.url.split('/')[2];
  const tasksByBoard = tasks.find((task) => task.boardId === boardId);
  if (!tasksByBoard)
    return reply.code(404).send({ message: 'Tasks not found' });
  return reply.code(200).type('json').send(tasksByBoard);
}

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
  reply.code(200).send(task);
  return task;
}

export async function addTask(
  request: FastifyRequest<{ Body: ITaskUpdate }>,
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
  const newTask: INewTask | undefined = { id: uuid(), ...data };
  newTask.boardId = boardId;
  tasks.push(newTask);
  return reply.code(201).send(newTask);
}

export async function updateTask(
  request: FastifyRequest<{ Params: { id: string }; Body: ITaskUpdate }>,
  reply: FastifyReply
): Promise<
  { name: string; id: string; login: string; password: string } | string
> {
  const boardId = request.url.split('/')[2];
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
  // if (!tasks.find((task) => task.id === id && task.boardId === boardId))
  //   return reply.code(404).send();
  // tasks = tasks.map((task) => {
  //   if (task.id === id && task.boardId === boardId) {
  //     return {
  //       id,
  //       ...req.body,
  //     };
  //   }
  //   return task;
  // });
  return reply.status(200).send(updatedTask);
}

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
  // tasks = tasks.filter((task) => task.id !== id);
  tasks.splice(indexToDelete, 1);
  return reply.code(204).send();
}

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
};
