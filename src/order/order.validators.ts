import { IsIn } from 'class-validator';
import {
  ORDER_CANCELLED_STATUS,
  ORDER_DELIVERED_STATUS,
  ORDER_OUT_FOR_DELIVERY_STATUS,
  ORDER_PLACED_STATUS,
  ORDER_SHIPPED_STATUS,
} from './order.constants';

export const IsValidOrderStatus = () => {
  return IsIn([
    ORDER_PLACED_STATUS,
    ORDER_SHIPPED_STATUS,
    ORDER_OUT_FOR_DELIVERY_STATUS,
    ORDER_DELIVERED_STATUS,
    ORDER_CANCELLED_STATUS,
  ]);
};
