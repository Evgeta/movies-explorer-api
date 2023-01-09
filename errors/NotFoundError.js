const { NOT_FOUND_ERROR_CODE, USER_NOT_FOUND_MESSAGE } = require('./errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_ERROR_CODE;
    this.message = USER_NOT_FOUND_MESSAGE;
  }
}

module.exports = NotFoundError;
