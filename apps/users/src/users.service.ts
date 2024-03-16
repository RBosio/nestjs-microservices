import { CreateUserDto, User } from '@app/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user)
      throw new RpcException({
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      });

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (user) return user;

    return null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userFounded = await this.findOneByEmail(createUserDto.email);
    if (userFounded)
      throw new RpcException({
        message: 'email already exists',
        status: HttpStatus.BAD_REQUEST,
      });

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async update({ userId, updateUserDto }): Promise<User> {
    const user = await this.findOne(userId);

    const userUpdated = Object.assign(user, updateUserDto);

    return this.userRepository.save(userUpdated);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.softDelete(id);

    return user;
  }
}
