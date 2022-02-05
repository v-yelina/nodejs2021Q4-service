import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ETask } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(ETask)
    private taskRepository: Repository<ETask>
  ) {}

  async findAll(boardId: string): Promise<Partial<ETask>[]> {
    return this.taskRepository.find({ where: { boardId } });
  }

  async findOne(
    boardId: string,
    taskId: string
  ): Promise<Partial<ETask> | undefined> {
    return this.taskRepository.findOne({ where: { boardId, id: taskId } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<ETask> {
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Partial<ETask> | undefined> {
    const taskForUpdate = await this.taskRepository.findOne(id);
    if (!taskForUpdate) return undefined;
    const updateResult = await this.taskRepository.save({
      ...taskForUpdate,
      ...updateTaskDto,
    });
    return updateResult;
  }

  async remove(id: string): Promise<boolean | undefined> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) return undefined;
    return true;
  }
}
