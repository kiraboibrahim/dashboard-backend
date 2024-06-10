import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CoreModule } from './core/core.module';
import { CustomerModule } from './customer/customer.module';
import { Vendor } from './vendor/entities/vendor.entity';
import { Driver } from './driver/entities/driver.entity';
import { Customer } from './customer/entities/customer.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { OrderedProduct } from './order/entities/ordered-product.entity';

const ENTITIES = [Vendor, Driver, Customer, Product, Order, OrderedProduct];

@Module({
  imports: [
    DriverModule,
    VendorModule,
    OrderModule,
    ProductModule,
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      entities: ENTITIES,
      synchronize: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
