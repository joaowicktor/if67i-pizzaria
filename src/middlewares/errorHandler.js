export const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode = 400, message } = err;

  res.status(statusCode).send({
    error: {
      statusCode,
      message,
    },
  });
};
