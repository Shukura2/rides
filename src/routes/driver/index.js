import express from 'express';
import {
  addRide,
  getAllOffers,
  getMyOffer,
  editRideOffer,
  deleteOffer,
} from '../../controllers';
import { isLoggedIn } from '../../middlewares';

const driverRouter = express.Router();

driverRouter.post('/add-ride', isLoggedIn, addRide);
driverRouter.get('/offers', isLoggedIn, getAllOffers);
driverRouter.get('/my-offer', isLoggedIn, getMyOffer);
driverRouter.put('/edit-offer/:offerId', isLoggedIn, editRideOffer);
driverRouter.delete('/delete-offer/:offerId', isLoggedIn, deleteOffer);

export default driverRouter;
