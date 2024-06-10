import { Injectable } from '@nestjs/common';
import {
  IsIn,
  isString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isArray } from 'class-validator';
import { EntityManager, FindOptionsRelations, In } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityClass, EntityColumnName } from './core.types';
import { isUGPhoneNumber } from './core.utils';
import { AIRTEL_UG_REGEX, LYCA_UG_REGEX, MTN_UG_REGEX } from './core.constants';
import UgandanCities from './cities';

@ValidatorConstraint({ async: false })
@Injectable()
export class _IsUGPhoneNumber implements ValidatorConstraintInterface {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, validationArguments: ValidationArguments) {
    if (!isString(value)) return false;
    return isUGPhoneNumber(value);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} should match ${MTN_UG_REGEX} or ${AIRTEL_UG_REGEX} or ${LYCA_UG_REGEX}`;
  }
}

export const IsUGPhoneNumber = () => {
  return Validate(_IsUGPhoneNumber);
};

@ValidatorConstraint({ async: true })
@Injectable()
export class _LoadEntityIfExists implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  async validate(value: any, validationArguments: ValidationArguments) {
    if (!value) return false;
    const [
      entityClass,
      property = validationArguments.property,
      findByColumnName,
      relations,
      allow_null,
    ] = validationArguments.constraints;
    const whereOptions = { [findByColumnName]: value };
    const entity = await this.entityManager
      .getRepository(entityClass)
      .findOne({ where: whereOptions, relations });
    const entityExists = !!entity || allow_null;
    if (entityExists) {
      const { object } = validationArguments;
      Object.defineProperty(object, property, {
        value: entity,
        writable: false,
      });
    }
    return entityExists;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} doesn't exist`;
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class _LoadEntitiesIfExist implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  async validate(value: any, validationArguments: ValidationArguments) {
    const [
      entityClass,
      entitiesHolderProperty = validationArguments.property,
      findByColumnName,
      relations,
      allow_empty,
    ] = validationArguments.constraints;
    if (!isArray(value)) return false;
    const whereOptions = { [findByColumnName]: In(value) };
    const entities = await this.entityManager
      .getRepository(entityClass)
      .find({ where: whereOptions, relations });
    const entitiesExist = entities.length === value.length || allow_empty;
    if (entitiesExist) {
      const { object } = validationArguments;
      Object.defineProperty(object, entitiesHolderProperty, {
        value: entities,
        writable: false,
      });
    }
    return entitiesExist;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} doesn't exist`;
  }
}

export const LoadEntityIfExists = function <T>(
  entityClass: EntityClass<T>,
  accessEntityByProperty: string,
  findByColumnName: EntityColumnName<T> | 'id' = 'id',
  relations?: FindOptionsRelations<T>,
  allow_null: boolean = false,
) {
  return Validate(_LoadEntityIfExists, [
    entityClass,
    accessEntityByProperty,
    findByColumnName,
    relations,
    allow_null,
  ]);
};

export const LoadEntitiesIfExist = function <T>(
  entityClass: EntityClass<T>,
  accessEntityByProperty: string,
  findByColumnName: EntityColumnName<T> | 'id' = 'id',
  relations?: FindOptionsRelations<T>,
  allow_empty = false,
) {
  return Validate(_LoadEntitiesIfExist, [
    entityClass,
    accessEntityByProperty,
    findByColumnName,
    relations,
    allow_empty,
  ]);
};

export function IsUgandanCity() {
  return IsIn(UgandanCities);
}
