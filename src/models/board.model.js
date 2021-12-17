const getBoardValidation = {
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: { type: 'array' },
      },
    },
  },
};

const addBoardValidation = {
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        columns: {
          type: 'array',
          properties: {
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                order: { type: 'integer' },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { getBoardValidation, addBoardValidation };
