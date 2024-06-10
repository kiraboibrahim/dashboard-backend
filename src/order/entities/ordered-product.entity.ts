import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OrderedProduct {
  @Exclude()
  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Order)
  order: Order;
}
