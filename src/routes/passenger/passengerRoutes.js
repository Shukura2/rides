import express from 'express';
import multer from 'multer';
import passport from 'passport';
import {
  createPassenger,
  loginPassenger,
  editProfile,
  resetPassword,
  updatePassword,
  joinRide,
  uploadPassengerImage,
} from '../../controllers';
import {
  validateSignup,
  validateExistingPassenger,
  isLoggedIn,
} from '../../middlewares';

const passengerRouter = express.Router();

const storage = multer.memoryStorage();
const maxSize = 1000000 * 1000;

export const uploads = multer({ storage, limits: { fileSize: maxSize } });

passengerRouter.post(
  '/signup',
  validateSignup,
  validateExistingPassenger,
  createPassenger
);
passengerRouter.post('/login', loginPassenger);
passengerRouter.put('/edit-profile', isLoggedIn, editProfile);
passengerRouter.post('/reset-password', resetPassword);
passengerRouter.put('/update-password', updatePassword);
passengerRouter.post('/join-ride/:offerId', isLoggedIn, joinRide);
passengerRouter.post(
  '/upload',
  isLoggedIn,
  uploads.single('image'),
  uploadPassengerImage
);
passengerRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

passengerRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/v1/auth/passenger/success',
    failureRedirect: '/v1/auth/passenger/failure',
  })
);

passengerRouter.get('/success', (req, res) => {
  res.status(200).json({
    message: 'this is a protected route',
    user: req.user,
    success: true,
  });
});

passengerRouter.get('/failure', (req, res) => {
  res.status(200).json({
    message: 'Something went wrong',
    success: false,
  });
});

export default passengerRouter;
