const { password, email, phone } = require('./validation-regular-exp');
const { REQUIRED_FIELD, PASSWORD, EMAIL, PHONE } = require('./validation-messages');

module.exports = {
  requiredField: { required: true, message: REQUIRED_FIELD },
  passwordRule: { pattern: password, message: PASSWORD, type: 'string' },
  emailRule: { pattern: email, message: EMAIL, type: 'string' },
  phoneRule: { pattern: phone, message: PHONE }
};
