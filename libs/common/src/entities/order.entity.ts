import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('order_')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @DeleteDateColumn()
  deleted_at: Date;
}
