const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const activityRouter = require('./routes/activityRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Serving static files
// app.use(express.static(`${__dirname}/public`)); // With this we can view files from our folder
// Because of this we can have css and favicon and a lot of stuff in pug templates
// Pug template sends requests to this rout that we defined to get all of this stuff
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));

// Http headers security

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://plantree.up.railway.app'],
      scriptSrc: [
        "'self'",
        'https://www.paypalobjects.com',
        'https://cdnjs.cloudflare.com',
        'https://www.paypal.com/',
        'www.paypalobjects.com',
      ],
      imgSrc: [
        "'self'",
        'https://www.paypalobjects.com',
        'https://plantree.up.railway.app',
        '127.0.0.1:3000',
        'data:',
      ],
      formAction: ["'self'", 'https://www.paypal.com'],
    },
  })
);

// Limits the requests to the app
const limiter = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // time
  message: 'Too many requests from this IP, please try again in an hour!', // err.message
});

app.use('/api', limiter);

// For DOS
// Limits the size of the data that someone sends
app.use(express.json({ limit: '10kb' })); // Parses data from the budy

app.use(cookieParser()); // Parses data from the cookie

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (cross site scripting attacs)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use('/', viewRouter);
app.use('/api/v1/activity', activityRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/users', userRouter);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
app.use(globalErrorHandler);

module.exports = app;
