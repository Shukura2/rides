import Model from '../../models/model';
import { uploadToCloud, dataUri } from '../../utils/upload';

const passengerModel = new Model('passenger');

export const uploadPassengerImage = async (req, res) => {
  const { passengerId } = req.user.userInfo;
  if (req.file) {
    try {
      const file = dataUri(req).content;
      const imageUrl = await uploadToCloud(file, 'Passenger Profile Pic');
      const data = { profile_pic: imageUrl };
      const clause = `WHERE passenger_id = '${passengerId}'`;
      const addProfilePic = await passengerModel.editFromTable(data, clause);
      return res.status(200).json({
        message: 'File successfully uploaded',
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'someting went wrong while processing your request',
        success: false,
      });
    }
  }
};
