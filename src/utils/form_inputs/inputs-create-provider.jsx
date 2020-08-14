import { REQUIRED_FIELD_RULE } from '../validation-rules';
import { email, phone, whatsapp, benefit, name, speciality } from './inputs-texts';
import { defaultInputProperties } from '../inputs-formats';

export const providerInputs = [
  {
    ...defaultInputProperties(email),
    type: 'email',
    rules: [REQUIRED_FIELD_RULE],
    iconType: 'mail'
  },
  {
    ...defaultInputProperties(phone),
    type: 'phone',
    rules: [REQUIRED_FIELD_RULE],
    iconType: 'phone'
  },
  {
    ...defaultInputProperties(whatsapp),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(name),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(benefit),
    type: 'Integer',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(speciality),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  }
];
