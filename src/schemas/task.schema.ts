const getTasksByBoardValidation = {
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

const getTaskValidation = {
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

const addTaskValidation = {
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

module.exports = {
  getTaskValidation,
  addTaskValidation,
  getTasksByBoardValidation,
};
