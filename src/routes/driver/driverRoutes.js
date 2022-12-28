import express from 'express';
import multer from 'multer';
import {
  createDriver,
  loginDriver,
  addRide,
  editDriverProfile,
  getAllOffers,
  editRideOffer,
  deleteOffer,
  resetDriverPassword,
  updateDriverPassword,
  uploadImage,
} from '../../controllers';
import {
  validateSignup,
  validateExistingDriver,
  isLoggedIn,
} from '../../middlewares/middleware';

const driverRouter = express.Router();

const storage = multer.memoryStorage();
const maxSize = 1000000 * 1000;

export const uploads = multer({ storage, limits: { fileSize: maxSize } });

driverRouter.post(
  '/signup',
  validateSignup,
  validateExistingDriver,
  createDriver
);
driverRouter.post('/login', loginDriver);
driverRouter.put('/edit-profile', isLoggedIn, editDriverProfile);
driverRouter.post('/reset-password', resetDriverPassword);
driverRouter.put('/update-password', updateDriverPassword);
driverRouter.post('/add-ride', isLoggedIn, addRide);
driverRouter.get('/offers', isLoggedIn, getAllOffers);
driverRouter.put('/edit-offer/:offerId', isLoggedIn, editRideOffer);
driverRouter.delete('/delete-offer/:offerId', isLoggedIn, deleteOffer);
driverRouter.post('/upload', isLoggedIn, uploads.single('image'), uploadImage);

export default driverRouter;
