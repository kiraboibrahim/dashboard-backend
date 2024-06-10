import * as argon2 from 'argon2';
import { AIRTEL_UG_REGEX, LYCA_UG_REGEX, MTN_UG_REGEX } from './core.constants';

export async function hash(value: string) {
  return await argon2.hash(value);
}

export function isUGPhoneNumber(phoneNumber: string) {
  return (
    MTN_UG_REGEX.test(phoneNumber) ||
    AIRTEL_UG_REGEX.test(phoneNumber) ||
    LYCA_UG_REGEX.test(phoneNumber)
  );
}
