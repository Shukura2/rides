import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import './utils/passport';
import driverRouter from './routes/driver';
import passengerRouter from './routes/passenger';

const app = express();

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1/auth', authRouter);
app.use('/v1/user', userRouter);
app.use('/v1/driver', driverRouter);
app.use('/v1/passenger', passengerRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
