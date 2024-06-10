import {
  FilterOperator,
  PaginateConfig,
  PaginationType,
} from 'nestjs-paginate';
import { Driver } from './entities/driver.entity';

export const DRIVER_PAGINATION_CONFIG: PaginateConfig<Driver> = {
  searchableColumns: ['firstName', 'lastName'],
  sortableColumns: ['firstName', 'lastName'],
  defaultSortBy: [
    ['firstName', 'DESC'],
    ['lastName', 'DESC'],
  ],
  filterableColumns: { city: [FilterOperator.EQ] },
  paginationType: PaginationType.LIMIT_AND_OFFSET,
};
