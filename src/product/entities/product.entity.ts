import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  numInStock: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Vendor)
  vendor: Vendor;
}
