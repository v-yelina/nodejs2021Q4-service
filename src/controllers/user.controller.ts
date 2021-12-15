import {IUser, INewUser, IUserUpdate} from '../interfaces/user.interfaces'
import {users} from "../bd";
import User from '../models/user.model.js';
import { FastifyReply, FastifyRequest } from 'fastify';


export async function getAllUsers (_request: FastifyRequest, _reply:FastifyReply) {
  return users.length ? users.map((user: User) => ({
      id: user.id,
      name: user.name,
      login: user.login,
    }))
    : users;
  }


  /**
   * Returns the user with a given id.
   *
   *
   * @param id - The id of user which should be found
   * @returns IUser with given id (without password)
   *
   */
  export async function getOneUser(request: FastifyRequest<{ Params: { id: string } }>, _reply:FastifyReply): Promise<{ name: string; id: string; login: string; } | undefined> {
    const id: string = request.params.id; 
    const user: IUser | undefined = new User(users.find((us: IUser) => us.id === id));
    if (user) {
      return { id: user.id, name: user.name, login: user.login };
    }
    return undefined;
    ;
  }


  /**
   * Add new user to database.
   *
   *
   * @param data - New user data
   * @returns newUser - created user
   *
   */
 export async function addUser (request: FastifyRequest<{ Body: IUserUpdate }>, _reply:FastifyReply): Promise<{ name: string; id: string; login: string; } | undefined> {
   const data = request.body;
    const newUser: INewUser | undefined = new User(data);
    users.push(newUser);
    return newUser;
  };

  export async function updateUser (request: FastifyRequest<{Params: { id: string }, Body: IUserUpdate }>, _reply:FastifyReply): Promise<{ name: string; id: string; login: string; password: string } | string> {
    const id: string = request.params.id;
    const data = request.body;
    const indexToChange: number = users.findIndex((user: IUser) => user.id === id);
    if (indexToChange === -1) return 'User not found';
    const updatedUser: IUser = {id,
          ...data};
    users.splice(indexToChange, 1, updatedUser);
    // users = users.map((user: IUser) => {
    //   if (user.id === id) {
    //     return {
    //       id,
    //       ...data,
    //     };
    //   }
    //   return updatedUser;
    // });
    return {
      id,
      ...data,
    };
  };

  export async function deleteUser (request: FastifyRequest<{ Params: { id: string } }>, _reply:FastifyReply): Promise<{ name: string; id: string; login: string; } | undefined> {
    const id: string = request.params.id;
    const indexToDelete: number = users.findIndex((user: IUser) => user.id === id);
    users.splice(indexToDelete, 1);
    // tasks = tasks.map((task) => {
    //   if (task.userId === id) {
    //     return {
    //       ...task as {},
    //       userId: null,
    //     };
    //   }
    //   return task;
    // });
    // users = users.filter((user: User) => user.id !== id);
    return;
  };

