import { LoadEntitiesIfExist } from '../../core/core.validators';
import { Product } from '../../product/entities/product.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @LoadEntitiesIfExist<Product>(Product, 'products', 'id')
  productIds: number[];

  @IsNotEmpty()
  productQuantities: any;
}
