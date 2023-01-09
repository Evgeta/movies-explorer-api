const { USER_EXISTS_ERROR_CODE, DUPLICATE_USER_MESSAGE } = require('./errors');

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
    this.statusCode = USER_EXISTS_ERROR_CODE;
    this.message = DUPLICATE_USER_MESSAGE;
  }
}

module.exports = UserExistsError;
