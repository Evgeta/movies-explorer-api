const {
  NODE_ENV = 'development',
  JWT_SECRET = 'dev-secret',
  PORT = 3002,
  DB_PATH = 'mongodb://localhost:27017/moviesdb',
} = process.env;

// Массив разешённых доменов
const allowedCors = [
  'https://moviesexplorer.evgeta.nomoredomains.sbs',
  'http://moviesexplorer.evgeta.nomoredomains.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
];

// Тексты сообщений
module.exports.AUTHORIZATION_SUCCESSFUL_MESSAGE = 'Указан некорректный URL';
module.exports.FILM_DELETE_SUCCESSFUL_MESSAGE = 'Фильм удалён';

module.exports = {
  allowedCors,
  JWT_SECRET,
  NODE_ENV,
  PORT,
  DB_PATH,
};
