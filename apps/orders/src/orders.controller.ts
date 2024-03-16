import { Body, Controller, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ClientNats,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { CreateOrderDto, Order } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Controller()
export class OrdersController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientNats,
    private readonly ordersService: OrdersService,
  ) {}

  @MessagePattern({ cmd: 'findOrders' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'findOrder' })
  async findOne(@Param('userId', ParseIntPipe) userId: number): Promise<Order> {
    return this.ordersService.findOne(userId);
  }

  @MessagePattern({ cmd: 'createOrder' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const user = await lastValueFrom(
        this.natsClient.send({ cmd: 'findUser' }, createOrderDto.userId),
      );

      return this.ordersService.create(user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern({ cmd: 'deleteOrder' })
  async delete(@Param('userId', ParseIntPipe) userId: number): Promise<Order> {
    return this.ordersService.delete(userId);
  }
}
