import { userModel } from './auth/userAuth';

export const getProfilePic = async (req, res) => {
  try {
    const { userId } = req.user.userInfo;

    const column = 'profile_pic';
    const clause = `WHERE user_details_id = '${userId}'`;
    const data = await userModel.select(column, clause);
    return res.status(200).json({ message: data.rows[0], success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
