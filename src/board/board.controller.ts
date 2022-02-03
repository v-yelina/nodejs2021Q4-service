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
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateBoardDto, UpdateBoardDto } from './board.dto';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Partial<CreateBoardDto>[]> {
    return this.boardService.findAll();
  }

  @Get(':Id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Partial<CreateBoardDto>> {
    const board = await this.boardService.findOne(id);

    if (!board) throw new NotFoundException();
    return board;
  }

  @Post()
  @HttpCode(201)
  create(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Partial<CreateBoardDto>> {
    return this.boardService.create(createBoardDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<Partial<CreateBoardDto> | undefined> {
    const updateResult = this.boardService.update(id, updateBoardDto);
    if (!updateResult) throw new NotFoundException();
    return updateResult;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Res({ passthrough: true }) res: Response | FastifyReply,
    @Param('id') id: string
  ): Promise<void> {
    const deleteResult = await this.boardService.remove(id);
    if (!deleteResult) throw new NotFoundException();
  }
}
