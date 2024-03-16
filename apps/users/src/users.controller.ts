import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, User } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'findUsers' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findUser' })
  async findOne(@Payload() userId: number): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @MessagePattern({ cmd: 'createUser' })
  async create(@Payload() data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  @MessagePattern({ cmd: 'updateUser' })
  async update(
    @Payload() data: { userId: number; updateUserDto: UpdateUserDto },
  ): Promise<User> {
    return this.usersService.update(data);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async delete(@Payload() userId: number): Promise<User> {
    return this.usersService.delete(userId);
  }
}
