import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderedProduct } from './entities/ordered-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderedProduct])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
