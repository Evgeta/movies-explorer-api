const {
  NODE_ENV = 'development',
  JWT_SECRET = 'dev-secret',
  PORT = 3000,
  DB_HOST = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const BAD_URL_FORMAT_MESSAGE = 'Указан некорректный URL';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DB_HOST,

  BAD_URL_FORMAT_MESSAGE,
};
