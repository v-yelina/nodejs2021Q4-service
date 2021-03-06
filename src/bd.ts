export const users: {
  name: string;
  id: string;
  login: string;
  password: string;
}[] = [];

export const boards: {
  id: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
}[] = [];

export const tasks: {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}[] = [];
