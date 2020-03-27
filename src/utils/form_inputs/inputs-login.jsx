const { requiredField } = require('../validation-rules');
const { username, password } = require('./inputs-texts');
const { defaultInputProperties } = require('../inputs-formats');

export const loginInputs = [
  {
    ...defaultInputProperties(username),
    type: 'username',
    rules: [requiredField],
    iconType: 'mail'
  },
  {
    ...defaultInputProperties(password),
    type: 'password',
    rules: [requiredField],
    iconType: 'lock'
  }
];
