import { REGEX_PASSWORD, REGEX_EMAIL, REGEX_PHONE } from './validation-regular-exp';
import { REQUIRED_FIELD, PASSWORD, EMAIL, PHONE } from './validation-messages';

export const REQUIRED_FIELD_RULE = { required: true, message: REQUIRED_FIELD };
export const PASSWORD_RULE = { pattern: REGEX_PASSWORD, message: PASSWORD, type: 'string' };
export const EMAIL_RULE = { pattern: REGEX_EMAIL, message: EMAIL, type: 'string' };
export const PHONE_RULE = { pattern: REGEX_PHONE, message: PHONE };
