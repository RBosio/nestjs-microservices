import { CreateUserDto, UpdateUserDto } from '@app/common';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientNats) {}

  @Get()
  async findAll() {
    return this.natsClient.send({ cmd: 'findUsers' }, {});
  }

  @Get(':userId')
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.natsClient.send({ cmd: 'findUser' }, userId).pipe(
      catchError((val) => {
        if (val.status === 404) {
          throw new NotFoundException(val.message);
        }

        return of(val);
      }),
    );
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto).pipe(
      catchError((val) => {
        if (val.status === 400) {
          throw new BadRequestException(val.message);
        }

        return of(val);
      }),
    );
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.natsClient
      .send({ cmd: 'updateUser' }, { userId, updateUserDto })
      .pipe(
        catchError((val) => {
          if (val.status === 404) {
            throw new NotFoundException(val.message);
          }

          return of(val);
        }),
      );
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.natsClient.send({ cmd: 'deleteUser' }, userId).pipe(
      catchError((val) => {
        if (val.status === 404) {
          throw new NotFoundException(val.message);
        }

        return of(val);
      }),
    );
  }
}
