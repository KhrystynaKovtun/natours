const AppError = require('../utils/appErrors');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicationNameDB = (err) => {
  const message = `You duplicate name "${err.keyValue.name}". Please use another one!`;

  return new AppError(message, 400);
};

const sendDevError = (req, res, err) => {
  if (req.originalUrl.startsWith('/api/v1')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message,
    });
  }

  return res.status(err.statusCode).render('error', {
    message: err.message,
  });
};

const sendProdError = (req, res, err) => {
  if (err.isOperational) {
    if (req.originalUrl.startsWith('/api/v1')) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    return res.status(err.statusCode).render('error', {
      message: err.message,
    });
  }

  if (req.originalUrl.startsWith('/api/v1')) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  return res.status(err.statusCode).render('error', {
    message: 'Something went wrong! Please try again later!',
  });
};

const handleJWTError = () => new AppError('Invalid token!', 401);
const handleJWTExpired = () =>
  new AppError('Token is expired! Please login again!', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.kind === 'ObjectId') {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicationNameDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpired(error);
    }
    sendProdError(req, res, error);
  }
};
