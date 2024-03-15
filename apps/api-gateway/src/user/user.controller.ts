import { CreateUserDto, UpdateUserDto } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientNats) {}

  @Get()
  async findAll() {
    return this.natsClient.send({ cmd: 'findUsers' }, {});
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.natsClient.send({ cmd: 'findUser' }, userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.natsClient.send(
      { cmd: 'updateUser' },
      { userId, updateUserDto },
    );
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.natsClient.send({ cmd: 'deleteUser' }, userId);
  }
}
