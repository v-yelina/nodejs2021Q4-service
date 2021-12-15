export namespace taskSchema {

export const getAllTasksByBoardSchema = {
  params: {
    boardId: { type: 'string' },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'integer' },
          description: { type: 'string' },
          userId: { type: 'string' },
          boardId: { type: 'string' },
          columnId: { type: 'string' },
        },
      },
    },
  },
};

export const getOneTaskSchema = {
  params: {
    boardId: { type: 'string' },
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      },
    },
  },
};

export const addTaskSchema = {
  params: {
    boardId: { type: 'string' }
  },
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
      order: { type: 'integer' },
      description: { type: 'string' },
      userId: { type: ['string', 'null'] },
      columnId: { type: ['string', 'null'] },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      },
    },
  },
};

export const updateTaskSchema = {
  params: {
    boardId: { type: 'string' },
    id: { type: 'string' },
  },
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
      order: { type: 'integer' },
      description: { type: 'string' },
      userId: { type: ['string', 'null'] },
      columnId: { type: ['string', 'null'] },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'integer' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      },
    },
  },
}


export const deleteTaskSchema = {
  params: {
    boardId: { type: 'string' },
    id: { type: 'string' },
  },
  response: {
    204: {
      type: 'string',
    },
  },
};
}
