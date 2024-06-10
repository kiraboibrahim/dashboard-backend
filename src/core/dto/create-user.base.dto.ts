import { IsAlpha, IsEmail, IsStrongPassword } from 'class-validator';
import { IsUgandanCity, IsUGPhoneNumber } from '../core.validators';

export class CreateUserDto {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsUGPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsUgandanCity()
  city: string;

  @IsStrongPassword()
  password: string;
}
