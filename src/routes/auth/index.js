import express from 'express';
import passport from 'passport';
import { createPassenger, createDriver, loginUser } from '../../controllers';
import { validateExistingUser, validateSignup } from '../../middlewares';

const authRouter = express.Router();

authRouter.post(
  '/passenger-signup',
  validateSignup,
  validateExistingUser,
  createPassenger
);

authRouter.post(
  '/driver-signup',
  validateSignup,
  validateExistingUser,
  createDriver
);

authRouter.post('/login', loginUser);

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/v1/auth/success',
    failureRedirect: '/v1/auth/failure',
  })
);

authRouter.get('/success', (req, res) => {
  console.log('req user = ', req.user);
  res.status(200).json({
    message: 'Login Successfully',
    userInfo: req.user,
    success: true,
  });
});

authRouter.get('/failure', (req, res) => {
  res.status(200).json({
    message: 'Something went wrong',
    success: false,
  });
});

export default authRouter;
