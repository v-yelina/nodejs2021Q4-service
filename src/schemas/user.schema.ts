export namespace userSchema {

export const getAllUsersSchema = {
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
          name: { type: 'string' },
          login: { type: 'string' },
      },
    },
  },
  }
};

export const getOneUserSchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
      },
    },
  },
};

export const addUserSchema= {
  body: {
    type: 'object',
    required: ['name', 'login', 'password'],
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
      },
    },
  },
};


export const updateUserSchema = {
  params: {
    id: { type: 'string' },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        login: { type: 'string' },
      },
    },
  },
};

export const deleteUserSchema = {
  params: {
    id: { type: 'string' },
  },
  response: {
    204: {
      type: 'string',
    },
  },
};

}
