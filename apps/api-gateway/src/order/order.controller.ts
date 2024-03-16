import { CreateOrderDto } from '@app/common';
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

@Controller('order')
export class OrderController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientNats) {}

  @Get()
  async findAll() {
    return this.natsClient.send({ cmd: 'findOrders' }, {});
  }

  @Get(':orderId')
  async findOne(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.natsClient.send({ cmd: 'findOrder' }, orderId).pipe(
      catchError((val) => {
        if (val.status === 404) {
          throw new NotFoundException(val.message);
        }

        return of(val);
      }),
    );
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send({ cmd: 'createOrder' }, createOrderDto).pipe(
      catchError((val) => {
        if (val.status === 404) {
          throw new NotFoundException(val.message);
        }

        return of(val);
      }),
    );
  }

  @Delete(':orderId')
  async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.natsClient.send({ cmd: 'deleteOrder' }, orderId).pipe(
      catchError((val) => {
        if (val.status === 404) {
          throw new NotFoundException(val.message);
        }

        return of(val);
      }),
    );
  }
}
