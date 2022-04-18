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

export const templateInputs = [
  {
    ...defaultInputProperties(name),
    rules: [REQUIRED_FIELD_RULE]
  },/* Agregar campos dinamicamente como en el issuer de didi */
];
