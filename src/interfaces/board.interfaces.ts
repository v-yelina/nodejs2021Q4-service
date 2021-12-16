interface IBoard {
  id: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
}

interface INewBoard {
  id: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
}

interface IBoardUpdate {
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
}

export { IBoard, INewBoard, IBoardUpdate };
