import Model from '../../models/model';
import { userModel } from '../auth/userAuth';

export const rideOfferModel = new Model('ride_offer');

export const addRide = async (req, res) => {
  const { userId } = req.user.userInfo;
  const column = `*`;
  const clause = `WHERE user_details_id = '${userId}'`;
  try {
    const data = await userModel.select(column, clause);
    const {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      profile_pic: profilePic,
    } = data.rows[0];

    const { location, destination, amount } = req.body;
    const columns = `driver_id, driver_first_name, driver_last_name, amount, location, destination, status, driver_phone_number, driver_profile_pic`;
    const values = `'${userId}', '${firstName}', '${lastName}', '${amount}', '${location}', '${destination}', 'pending', '${phoneNumber}', '${profilePic}'`;

    const offerCreate = await rideOfferModel.insertWithReturn(columns, values);
    return res.status(200).json({
      message: 'Ride offer created successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAllOffers = async (req, res) => {
  const columns = '*';
  const clause = `FETCH FIRST 3 ROW ONLY`;
  try {
    const data = await rideOfferModel.select(columns, clause);
    res.status(200).json({ message: data.rows, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
