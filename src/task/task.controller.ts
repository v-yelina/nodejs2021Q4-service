import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
  ParseUUIDPipe,
  Res,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':boardId/tasks')
  @HttpCode(200)
  async findAll(
    @Param('boardId') boardId: string
  ): Promise<Partial<CreateTaskDto>[]> {
    return this.taskService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  @HttpCode(200)
  async findOne(
    @Param() params: { [key: string]: string }
  ): Promise<Partial<CreateTaskDto>> {
    const { boardId, taskId } = params;
    if (!boardId || !taskId) throw new BadRequestException();
    const task = await this.taskService.findOne(boardId, taskId);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post(':boardId/tasks')
  @HttpCode(201)
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Partial<CreateTaskDto>> {
    const { ...newTaskData } = createTaskDto;
    newTaskData.boardId = boardId;
    return this.taskService.create(newTaskData);
  }

  @Put(':boardId/tasks/:id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Partial<CreateTaskDto> | undefined> {
    const updateResult = this.taskService.update(id, updateTaskDto);
    if (!updateResult) throw new NotFoundException();
    return updateResult;
  }

  @Delete(':boardId/tasks/:id')
  @HttpCode(204)
  async remove(
    @Res({ passthrough: true }) res: Response | FastifyReply,
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<void> {
    const deleteResult = await this.taskService.remove(id);
    if (!deleteResult) throw new NotFoundException();
  }
}
