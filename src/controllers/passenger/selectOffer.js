import Model from '../../models/model';

const rideOfferModel = new Model('ride_offer');

export const selectOffer = async (req, res) => {
  try {
    const { rideId } = req.params;
    const column = `ride_offer_id, driver_first_name, driver_last_name, driver_phone_number, driver_profile_pic, amount, location, destination`;
    const clause = `WHERE ride_offer_id = '${rideId}'`;
    const data = await rideOfferModel.select(column, clause);
    const {
      driver_first_name: driverFirstName,
      driver_last_name: driverLastName,
      driver_phone_number: driverPhoneNumber,
      driver_profile_pic: driverProfilePic,
      amount,
      location,
      destination,
    } = data.rows[0];

    const rideData = {
      driverFirstName,
      driverLastName,
      driverPhoneNumber,
      driverProfilePic,
      amount,
      location,
      destination,
    };
    return res.status(200).json({ message: rideData, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
