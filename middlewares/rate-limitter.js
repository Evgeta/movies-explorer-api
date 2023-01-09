const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничиквает каждый IP 100 запросами для окна `window`
  // (в данном случае в течение 15 минут)
  standardHeaders: true, // Возвращает rate limit в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключение заголовков `X-RateLimit-*`
});

module.exports = limiter;
