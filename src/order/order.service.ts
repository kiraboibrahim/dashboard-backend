import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from '../product/entities/product.entity';
import { isInt } from 'class-validator';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderedProduct } from './entities/ordered-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderedProduct)
    private orderedProductRepository: Repository<OrderedProduct>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { productQuantities } = createOrderDto;
    const { products }: { products: Product[] } = createOrderDto as any;
    this.validateQuantities(products, productQuantities);

    let orderedProducts = products.map((product) => {
      const { id: productId } = product;
      const productQuantity = productQuantities[`${productId}`];
      return this.orderedProductRepository.create({
        product: product,
        productId,
        quantity: productQuantity,
      });
    });
    orderedProducts = await this.orderedProductRepository.save(orderedProducts);
    const order = this.orderRepository.create({ products: orderedProducts });
    return this.orderRepository.save(order);
  }

  validateQuantities(products: Product[], productQuantities: any) {
    for (const product of products) {
      const { id: productId, numInStock: productStockNum } = product;
      const productQuantity =
        !!productQuantities[`${productId}`] &&
        +productQuantities[`${productId}`];
      const isValidQuantity =
        isInt(productQuantity) && productQuantity <= productStockNum;
      if (!isValidQuantity) {
        throw new BadRequestException(
          `Invalid quantity for product: ${product.name}`,
        );
      }
    }
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
