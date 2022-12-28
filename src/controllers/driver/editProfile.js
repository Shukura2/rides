import Model from '../../models/model';

export const editprofileModel = new Model('driver');

export const editDriverProfile = async (req, res) => {
  const data = req.body;
  const newData = {};
  if (data.firstName) {
    newData['first_name'] = data.firstName;
  }
  if (data.lastName) {
    newData['last_name'] = data.lastName;
  }
  const { driverId } = req.user.userInfo;
  const clause = `WHERE driver_id = '${driverId}'`;
  try {
    const dataInfo = await editprofileModel.editFromTable(newData, clause);
    res
      .status(200)
      .json({ message: 'Profile successfully updated', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
