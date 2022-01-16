interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface INewUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface IUserUpdate {
  name: string;
  login: string;
  password: string;
}

export { IUser, INewUser, IUserUpdate};