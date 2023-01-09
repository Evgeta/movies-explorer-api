const { INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_ERROR_MESSAGE } = require('./errors');

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectDataError';
    this.statusCode = INCORRECT_DATA_ERROR_CODE;
    this.message = INCORRECT_DATA_ERROR_MESSAGE;
  }
}

module.exports = IncorrectDataError;
