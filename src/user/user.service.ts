import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EUser)
    private userRepository: Repository<EUser>
  ) {}

  async findAll(): Promise<Partial<EUser>[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<Partial<EUser> | undefined> {
    const user = await this.userRepository.findOne(id);
    if (!user) return undefined;
    return EUser.responseUser(user);
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<EUser>> {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return EUser.responseUser(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<Partial<EUser> | undefined> {
    const userForUpdate = await this.userRepository.findOne(id);
    if (!userForUpdate) return undefined;
    const updateResult = await this.userRepository.save({
      ...userForUpdate,
      ...updateUserDto,
    });
    return updateResult;
  }

  async remove(id: string): Promise<boolean | undefined> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) return undefined;
    return true;
  }

  async findByLogin(login: string): Promise<EUser | undefined> {
    return this.userRepository.findOne({ login });
  }
}
