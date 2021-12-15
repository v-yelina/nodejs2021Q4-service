"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_route_1 = require("./routes/user.route");
const task_route_1 = require("./routes/task.route");
const server = (0, fastify_1.default)();
// const schema = {
//   type: 'object',
//   required: ['PORT'],
//   properties: {
//     PORT: {
//       type: 'number',
//       default: 3000,
//     },
//   },
// };
// const options = {
//   confKey: 'config',
//   schema,
//   dotenv: true,
//   data: process.env,
// };
server.register(user_route_1.userRoutes);
server.register(task_route_1.taskRoutes);
// server.register(boardRoutes);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(4000);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
start();
