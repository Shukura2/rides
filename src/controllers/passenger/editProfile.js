import Model from '../../models/model';

export const editProfileModel = new Model('passenger');

export const editProfile = async (req, res) => {
  const data = req.body;

  const newData = {};

  if (data.firstName) {
    newData['first_name'] = data.firstName;
  }
  if (data.lastName) {
    newData['last_name'] = data.lastName;
  }

  const { passengerId } = req.user.userInfo;
  const clause = `WHERE passenger_id = '${passengerId}'`;
  try {
    const dataInfo = await editProfileModel.editFromTable(newData, clause);
    res
      .status(200)
      .json({ message: 'Profile edited Successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
