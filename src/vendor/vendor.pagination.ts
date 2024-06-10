import {
  FilterOperator,
  PaginateConfig,
  PaginationType,
} from 'nestjs-paginate';
import { Vendor } from './entities/vendor.entity';

export const VENDOR_PAGINATION_CONFIG: PaginateConfig<Vendor> = {
  searchableColumns: ['firstName', 'lastName'],
  sortableColumns: ['firstName', 'lastName'],
  defaultSortBy: [
    ['firstName', 'DESC'],
    ['lastName', 'DESC'],
  ],
  filterableColumns: { city: [FilterOperator.EQ] },
  paginationType: PaginationType.LIMIT_AND_OFFSET,
};
