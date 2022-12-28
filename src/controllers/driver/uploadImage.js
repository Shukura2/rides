import Model from '../../models/model';
import { uploadToCloud, dataUri } from '../../utils/upload';

const driverModel = new Model('driver');

export const uploadImage = async (req, res) => {
  const { driverId } = req.user.userInfo;

  if (req.file) {
    try {
      const file = dataUri(req).content;
      const imageUrl = await uploadToCloud(file, 'Driver Profile Pic');
      const data = { profile_pic: imageUrl };
      const clause = `WHERE driver_id = '${driverId}'`;
      const addProfilePic = await driverModel.editFromTable(data, clause);
      return res.status(200).json({
        message: 'File successfully uploaded',
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'something went wrong while processing your request',
        success: false,
      });
    }
  }
};
