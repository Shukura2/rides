import Model from '../../models/model';

const rideOfferModel = new Model('ride_offer');
const rideHistoryModel = new Model('ride_history');

export const joinRide = async (req, res) => {
  const { offerId } = req.params;
  const { passengerId } = req.user.userInfo;
  const column = '*';
  const clause = `WHERE ride_offer_id = '${offerId}'`;
  try {
    const data = await rideOfferModel.select(column, clause);
    const {
      ride_offer_id: rideId,
      driver_id: driverId,
      amount,
      location,
      destination,
      created_at: createdAt,
    } = data.rows[0];

    const columns = `"driver_id", "passenger_id", "ride_offer_id", "amount", "location", "destination", "status"`;
    const values = `'${driverId}', '${passengerId}', '${rideId}', '${amount}', '${location}', '${destination}', 'Start trip'`;
    const rideHistoryData = await rideHistoryModel.insertWithReturn(
      columns,
      values
    );
    return res
      .status(200)
      .json({ message: 'Ride join successfully', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
