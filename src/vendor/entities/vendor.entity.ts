import { Entity } from 'typeorm';
import { User } from '../../core/entities/user.base.entity';

@Entity()
export class Vendor extends User {}
