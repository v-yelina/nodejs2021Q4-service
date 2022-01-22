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
        token: { type: 'string' },
      },
    },
  },
};
