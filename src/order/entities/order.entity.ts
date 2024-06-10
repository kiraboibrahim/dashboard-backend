import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderedProduct } from './ordered-product.entity';
import { IsValidOrderStatus } from '../order.validators';
import { ORDER_PLACED_STATUS } from '../order.constants';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  placedAt: string;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order, {
    eager: true,
  })
  products: OrderedProduct[];

  @Column({ default: ORDER_PLACED_STATUS })
  @IsValidOrderStatus()
  status: string;
}
