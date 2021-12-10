import {IUser, INewUser, IUserUpdate} from '../interfaces/user.interfaces'
import {users} from "../bd";
import User from '../models/user.model.js';

export const getAllUsers = () => users.length ? users.map((user:User) => ({
          id: user.id,
          name: user.name,
          login: user.login,
        }))
      : users;

/**
 * Returns the user with a given id.
 *
 *
 * @param id - The id of user which should be found
 * @returns User with given id (without password)
 *
 */
export const getOneUser = (id:string) => {
  const user: IUser | undefined = new User(users.find((us:IUser) => us.id === id));
  if (user) {
    return { id: user.id, name: user.name, login: user.login }
  };
};

export const addUser = (data:IUserUpdate) => {
  const newUser: INewUser | undefined = new User(data);
  bd.users.push(newUser);
  return newUser;
};

export const updateUser = (id:string, data:IUserUpdate) => {

  if (!bd.users.find((user:IUser) => user.id === id)) return '';
  bd['users'] = bd.users.map((user:IUser) => {
    if (user.id === id) {
      return {
        id,
        ...data,
      };
    }
    return user;
  });
  return {
    id,
    ...data,
  };
};

export const deleteUser = (id:string) => {
  bd.tasks = bd.tasks.map((task) => {
    if (task.userId === id) {
      return {
        ...task as {},
        userId: null,
      };
    }
    return task;
  });
  bd.users = bd.users.filter((user:User) => user.id !== id);
  return '';
};
