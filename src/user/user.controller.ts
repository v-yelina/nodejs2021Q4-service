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
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Partial<CreateUserDto>[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Partial<CreateUserDto>> {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  @HttpCode(201)
  create(
    @Body() createUserDto: CreateUserDto
  ): Promise<Partial<CreateUserDto>> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Partial<CreateUserDto> | undefined> {
    const updateResult = this.userService.update(id, updateUserDto);
    if (!updateResult) throw new NotFoundException();
    return updateResult;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const deleteResult = await this.userService.remove(id);
    if (!deleteResult) throw new NotFoundException();
  }
}
