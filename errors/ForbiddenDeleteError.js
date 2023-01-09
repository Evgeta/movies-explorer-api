const { FORBIDDEN_DELETE_ERROR_CODE, NOT_ALLOWED_TO_REMOVE_MESSAGE } = require('./errors');

class ForbiddenDeleteError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenDeleteError';
    this.statusCode = FORBIDDEN_DELETE_ERROR_CODE;
    this.message = NOT_ALLOWED_TO_REMOVE_MESSAGE;
  }
}

module.exports = ForbiddenDeleteError;
