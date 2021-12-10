"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_env_1 = __importDefault(require("fastify-env"));
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'number',
            default: 3000,
        },
    },
};
const options = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env,
};
server.register(fastify_env_1.default, options).ready((err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});
server.register(require('./routes/user.route'));
server.register(require('./routes/task.route'));
server.register(require('./routes/boarder.route'));
const start = async () => {
    try {
        await server.listen(4000);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
