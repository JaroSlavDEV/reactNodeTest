const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(15);

const SECRET_JWT_KEY_SIGN_IN = 'signin_secret';
const EXPIRE_TIME_JWT_SIGN_IN = 60 * 60; //seconds
const MOCK_USER_EMAIL = 'admin@admin.com';
const MOCK_USER_PASSWORD = bcrypt.hashSync('123456', salt);
const SECRET_KEY_PASSWORD = 'Hello world';

module.exports = {
  SECRET_JWT_KEY_SIGN_IN,
  EXPIRE_TIME_JWT_SIGN_IN,
  MOCK_USER_EMAIL,
  MOCK_USER_PASSWORD,
  SECRET_KEY_PASSWORD
};
