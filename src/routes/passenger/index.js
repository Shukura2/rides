import express from 'express';
import { getJoinRide, getMyRideHistory, joinRide } from '../../controllers';
import { isLoggedIn } from '../../middlewares';

const passengerRouter = express.Router();

passengerRouter.put('/join-ride/:offerId', isLoggedIn, joinRide);
passengerRouter.get('/join-ride/:offerId', isLoggedIn, getJoinRide);
passengerRouter.get('/ride-history', isLoggedIn, getMyRideHistory);

export default passengerRouter;
