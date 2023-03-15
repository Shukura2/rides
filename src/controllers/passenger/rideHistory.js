import Model from '../../models/model';

const rideHistoryModel = new Model('ride_history');

export const getMyRideHistory = async (req, res) => {
  try {
    const { userId } = req.user.userInfo;
    const column = `driver_first_name, driver_last_name, amount, location, destination, driver_profile_pic, created_at`;
    const clause = `WHERE passenger_id = '${userId}'`;

    const data = await rideHistoryModel.select(column, clause);
    return res.status(200).json({ message: data.rows, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
