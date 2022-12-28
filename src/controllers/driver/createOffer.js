import Model from '../../models/model';

export const rideOfferModel = new Model('ride_offer');

export const addRide = async (req, res) => {
  const { driverId } = req.user.userInfo;
  const { location, destination, amount, status } = req.body;
  const columns = `driver_id, amount, location, destination, status`;
  const values = `'${driverId}', '${amount}', '${location}', '${destination}', '${status}'`;
  try {
    const data = await rideOfferModel.insertWithReturn(columns, values);
    res.status(200).json({ message: data.rows, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllOffers = async (req, res) => {
  const columns = '*';
  const { driverId } = req.user.userInfo;
  const clause = `WHERE driver_id = '${driverId}'`;
  try {
    const data = await rideOfferModel.select(columns, clause);
    res.status(200).json({ message: data.rows, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
