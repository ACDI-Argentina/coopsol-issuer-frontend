import { REQUIRED_FIELD_RULE } from '../validation-rules';
import { username, email, password } from './inputs-texts';
import { defaultInputProperties } from '../inputs-formats';

export const loginInputs = [
  {
    ...defaultInputProperties(email),
    type: 'email',
    rules: [REQUIRED_FIELD_RULE],
    iconType: 'mail'
  },

  {
    ...defaultInputProperties(password),
    type: 'password',
    rules: [REQUIRED_FIELD_RULE],
    iconType: 'lock'
  }
];
