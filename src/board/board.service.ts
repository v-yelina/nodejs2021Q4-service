import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';
import { EBoard } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(EBoard)
    private boardRepository: Repository<EBoard>
  ) {}

  async findAll(): Promise<Partial<EBoard>[]> {
    return this.boardRepository.find();
  }

  async findOne(id: string): Promise<Partial<EBoard> | undefined> {
    const board = await this.boardRepository.findOne(id);
    if (!board) return undefined;
    return board;
  }

  async create(createBoardDto: CreateBoardDto): Promise<EBoard> {
    const newboard = this.boardRepository.create(createBoardDto);
    return this.boardRepository.save(newboard);
  }

  async update(
    id: string,
    updatEBoardDto: UpdateBoardDto
  ): Promise<Partial<EBoard> | undefined> {
    const boardForUpdate = await this.boardRepository.findOne(id);
    if (!boardForUpdate) return undefined;
    const updateResult = await this.boardRepository.save({
      ...boardForUpdate,
      ...updatEBoardDto,
    });
    return updateResult;
  }

  async remove(id: string): Promise<boolean | undefined> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) return undefined;
    return true;
  }
}
