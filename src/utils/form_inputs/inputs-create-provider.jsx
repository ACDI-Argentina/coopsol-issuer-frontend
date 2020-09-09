import { REQUIRED_FIELD_RULE, MIN_NUMBER_RULE } from '../validation-rules';
import { email, phone, whatsapp, benefit, name, speciality, description } from './inputs-texts';
import { defaultInputProperties } from '../inputs-formats';

export const providerInputs = [
  {
    ...defaultInputProperties(name),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(speciality),
    type: 'String',
    rules: [REQUIRED_FIELD_RULE]
  },
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
    ...defaultInputProperties(benefit),
    type: 'Number',
    rules: [MIN_NUMBER_RULE(0)]
  },
  {
    ...defaultInputProperties(description),
    type: 'String'
  }
];
