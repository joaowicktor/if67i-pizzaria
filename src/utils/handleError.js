export const handleError = (err, res) => {
  const { statusCode = 400, message } = err;

  res.status(400).send({
    error: {
      statusCode,
      message,
    },
  });
};
