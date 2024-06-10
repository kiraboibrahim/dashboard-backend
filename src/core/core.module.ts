import { Global, Module } from '@nestjs/common';
import { _LoadEntityIfExists, _LoadEntitiesIfExist } from './core.validators';

const VALIDATORS = [_LoadEntitiesIfExist, _LoadEntityIfExists];
@Global()
@Module({
  providers: [...VALIDATORS],
  exports: [...VALIDATORS],
})
export class CoreModule {}
