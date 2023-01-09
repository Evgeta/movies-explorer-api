const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } = require('./errors');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DefaultError';
    this.statusCode = DEFAULT_ERROR_CODE;
    this.message = DEFAULT_ERROR_MESSAGE;
  }
}

module.exports = DefaultError;
