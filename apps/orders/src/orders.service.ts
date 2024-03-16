import { CreateOrderDto, Order, User } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: User): Promise<Order> {
    const order = this.orderRepository.create({
      date: new Date(),
    });
    order.user = user;

    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<Order> {
    const order = await this.findOne(id);
    this.orderRepository.softDelete(id);

    return order;
  }
}
