import { REQUIRED_FIELD_RULE } from '../validation-rules';
import { email, phone, whatsapp, benefit, name, speciality, description } from './inputs-texts';
import { defaultInputProperties } from '../inputs-formats';
import { MIN_NUMBER } from '../validation-messages';

const validateMin = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue('benefit') > -1) {
      return Promise.resolve();
    }
    return Promise.reject(MIN_NUMBER(0));
  }
});

export const providerInputs = [
  {
    ...defaultInputProperties(name),
    rules: [REQUIRED_FIELD_RULE]
  },
  {
    ...defaultInputProperties(speciality),
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
    iconType: 'phone'
  },
  {
    ...defaultInputProperties(benefit),
    type: 'number',
    rules: [validateMin]
  },
  {
    ...defaultInputProperties(description),
    type: 'String'
  }
];
