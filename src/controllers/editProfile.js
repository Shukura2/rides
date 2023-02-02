import { userModel } from './auth/userAuth';

export const editUserProfile = async (req, res) => {
  const data = req.body;
  const newData = {};
  if (data.firstName) {
    newData['first_name'] = data.firstName;
  }
  if (data.lastName) {
    newData['last_name'] = data.lastName;
  }
  const { userId } = req.user.userInfo;
  const clause = `WHERE user_details_id = '${userId}'`;
  try {
    const dataInfo = await userModel.editFromTable(newData, clause);
    res
      .status(200)
      .json({ message: 'Profile successfully updated', success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
