import express from 'express';
import {
  getJoinRide,
  getMyRideHistory,
  joinRide,
  selectOffer,
} from '../../controllers';
import { isLoggedIn } from '../../middlewares';

const passengerRouter = express.Router();

passengerRouter.put('/join-ride/:offerId', isLoggedIn, joinRide);
passengerRouter.get('/joined', isLoggedIn, getJoinRide);
passengerRouter.get('/select-offer/:rideId', isLoggedIn, selectOffer);
passengerRouter.get('/ride-history', isLoggedIn, getMyRideHistory);

export default passengerRouter;
