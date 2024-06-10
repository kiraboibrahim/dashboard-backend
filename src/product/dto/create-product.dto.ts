import { LoadEntityIfExists } from '../../core/core.validators';
import { Vendor } from '../../vendor/entities/vendor.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  numInStock: number;

  @LoadEntityIfExists<Vendor>(Vendor, 'vendor', 'id')
  vendorId: number;
}
