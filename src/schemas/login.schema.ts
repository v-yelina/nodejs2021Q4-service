export const loginSchema = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['login', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
        token: { type: 'string' },
      },
    },
  },
};
