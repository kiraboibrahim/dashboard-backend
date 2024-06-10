import { IsValidOrderStatus } from '../order.validators';

export class UpdateOrderDto {
  @IsValidOrderStatus()
  status: string;
}
