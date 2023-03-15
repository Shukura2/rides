import Model from '../../models/model';
import { userModel } from '../auth/userAuth';

const rideOfferModel = new Model('ride_offer');
const rideHistoryModel = new Model('ride_history');

export const joinRide = async (req, res) => {
  try {
    const { userId: passengerId } = req.user.userInfo;
    const { offerId } = req.params;
    const columns = `first_name, last_name, phone_number, profile_pic`;
    const clause = `WHERE user_details_id = '${passengerId}'`;
    const data = await userModel.select(columns, clause);
    const {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      profile_pic: profilePic,
    } = data.rows[0];

    const joinRide = {
      passenger_id: passengerId,
      status: 'start trip',
      passenger_first_name: firstName,
      passenger_last_name: lastName,
      passenger_phone_number: phoneNumber,
      passenger_profile_pic: profilePic,
    };
    const rideId = `WHERE ride_offer_id = '${offerId}'`;
    const dataInfo = await rideOfferModel.editFromTable(joinRide, rideId);

    const driverDetailsColumn = `passenger_id, driver_first_name, driver_last_name, ride_offer_id, amount, location, destination, driver_profile_pic, created_at`;
    const driverDetailsClause = `WHERE ride_offer_id = '${offerId}'`;
    const getDriverDetails = await rideOfferModel.select(
      driverDetailsColumn,
      driverDetailsClause
    );

    const {
      driver_first_name: driverFirstName,
      driver_last_name: driverLastName,
      ride_offer_id: rideOfferId,
      amount,
      location,
      destination,
      driver_profile_pic: driverProfilePic,
      created_at: createdAt,
    } = getDriverDetails.rows[0];

    const historyColumns = `passenger_id, driver_first_name, driver_last_name, ride_offer_id, amount, location, destination, driver_profile_pic, created_at`;
    const historyValues = `'${passengerId}', '${driverFirstName}', '${driverLastName}', '${rideOfferId}', '${amount}', '${location}', '${destination}', '${driverProfilePic}', '${createdAt}'`;

    const historyData = await rideHistoryModel.insertWithReturn(
      historyColumns,
      historyValues
    );
    return res.status(200).json({ message: 'Enjoy your ride!', success: true });
  } catch (error) {
    console.log('error = ', error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getJoinRide = async (req, res) => {
  try {
    const { userId: driverId } = req.user.userInfo;
    const column = `passenger_id, passenger_first_name, passenger_last_name, passenger_phone_number, passenger_profile_pic`;
    const clause = `WHERE driver_id = '${driverId}'`;
    const data = await rideOfferModel.select(column, clause);
    const {
      passenger_first_name: firstName,
      passenger_last_name: lastName,
      passenger_phone_number: phoneNumber,
      passenger_profile_pic: profilePic,
    } = data.rows[0];
    const passengerData = { firstName, lastName, phoneNumber, profilePic };
    return res.status(200).json({ message: passengerData, success: true });
  } catch (error) {
    console.log('error = ', error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
