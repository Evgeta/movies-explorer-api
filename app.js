require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { SERVER_WILL_BE_DOWN } = require('./errors/errors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_PATH, allowedCors } = require('./utils/config');
const limiter = require('./middlewares/rate-limitter');

const app = express();
const router = require('./routes/index');

// Слушаем 3002 порт
const { PORT = 3002 } = process.env;

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменнyю

  const { method } = req;
  const reqHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.end();
  }
  next();
  return null;
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_WILL_BE_DOWN);
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
