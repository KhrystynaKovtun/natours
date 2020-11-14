const express = require('express');
const path = require('path');
// const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appErrors');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}`, 'views'));

app.use(compression());

// Serving static files
app.use(express.static('./public'));

// Set security HTTP headers
// app.use(helmet());

// Log requests in development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Limit the same API requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/', viewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} in not implemented!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
