import verifyToken from '../middlewares/verifyToken';

export const getAllBoardsSchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'array',
      items: {
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
  },
  preHandler: verifyToken,
};

export const getOneBoardSchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
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
  preHandler: verifyToken,
};

export const addBoardSchema = {
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
  preHandler: verifyToken,
};

export const updateBoardSchema = {
  params: {
    id: { type: 'string' },
  },
  body: {
    type: 'object',
    properties: {
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
  response: {
    200: {
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
  preHandler: verifyToken,
};

export const deleteBoardSchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    204: {
      type: 'string',
    },
  },
  preHandler: verifyToken,
};
