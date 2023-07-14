module.exports.regexLink =  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

module.exports.FILM_INVALID_DATA = 'Переданы некорректные данные при создании фильма.';
module.exports.FILM_NOT_FOUND = 'фильм с указанным _id не найден.';
module.exports.FILM_FORBIDDEN_DELETE = 'Недостаточно прав для этого действия';
module.exports.FILM_INVALID_ID = 'Передан некорректный id.';

module.exports.USER_NOT_FOUND = 'Пользователь по указанному id не найден.';
module.exports.USER_INVALID_DATA = 'Переданы некорректные данные при обновлении/регистрирования профиля.';
module.exports.USER_CONFLICT_EMAIL = 'Пользователь с таким email уже зарегистрирован.';
module.exports.USER_INVALID_ID = 'Передан некорректный id.';

module.exports.NEED_AUTHORIZE = 'Необходима авторизация.';

module.exports.SERVER_DEFAULT_MESSAGE = 'На сервере произошла ошибка.';

module.exports.INVALID_EMAIL_OR_PASSWORD = 'Неверный email или пароль.';

module.exports.PAGE_NOT_FOUND = 'Запрашиваемая страница не найдена.';
