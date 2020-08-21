import { REQUIRED_FIELD_RULE } from '../validation-rules';
import { email, phone, whatsapp, benefit, name, speciality, description } from './inputs-texts';
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
    iconType: 'phone'
  },
  {
    ...defaultInputProperties(whatsapp),
    type: 'String',
    iconType: 'phone'
  },
  {
    ...defaultInputProperties(name),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(benefit),
    type: 'Number'
  },
  {
    ...defaultInputProperties(speciality),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(description),
    type: 'String'
  }
];
