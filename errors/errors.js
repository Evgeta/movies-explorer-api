// коды ошибок

module.exports.INCORRECT_DATA_ERROR_CODE = 400;
module.exports.NOT_FOUND_ERROR_CODE = 404;
module.exports.USER_EXISTS_ERROR_CODE = 409;
module.exports.UNAUTHORIZED_ERROR_CODE = 401;
module.exports.FORBIDDEN_DELETE_ERROR_CODE = 403;
module.exports.DEFAULT_ERROR_CODE = 500;

// Тексты сообщений об ошибках

module.exports.BAD_URL_FORMAT_MESSAGE = 'Указан некорректный URL';
module.exports.USER_NOT_FOUND_MESSAGE = 'Запрашиваемый пользователь не найден';
module.exports.INCORRECT_DATA_ERROR_MESSAGE = 'В запросе переданы некорректные данные';
module.exports.DUPLICATE_USER_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
module.exports.BAD_EMAIL_OR_PASSWORD_MESSAGE = 'Неправильные почта или пароль';
module.exports.FILMS_NOT_FOUND_MESSAGE = 'Не удалось найти фильмы';
module.exports.FILM_NOT_FOUND_MESSAGE = 'Фильм с таким id не найден';
module.exports.NOT_ALLOWED_TO_REMOVE_MESSAGE = 'Нельзя удалить фильм, сохраненный другим пользователем';
