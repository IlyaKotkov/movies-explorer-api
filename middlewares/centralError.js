const { SERVER_DEFAULT_MESSAGE } = require('../utils/constants');

const centralError = ((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { status = 500, message } = err;

  res.status(status).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: status === 500
      ? SERVER_DEFAULT_MESSAGE
      : message,
  });
  next();
});

module.exports = centralError;
