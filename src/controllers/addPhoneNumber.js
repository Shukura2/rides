import { userModel } from './auth/userAuth';

export const addPhoneNumber = async (req, res) => {
  const data = req.body;
  const token = req.token;

  const newData = {};

  if (data.phoneNumber) {
    newData['phone_number'] = data.phoneNumber;
  }
  const { userId } = req.user.userInfo;
  const clause = `WHERE user_details_id = '${userId}'`;
  try {
    const addPhoneNumber = await userModel.editFromTable(newData, clause);
    const info = `first_name, last_name, password, email, user_type, phone_number`;
    const infoClause = `WHERE user_details_id = '${userId}'`;
    const infoData = await userModel.select(info, infoClause);
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      user_type: userType,
      phone_number: phoneNumber,
    } = infoData.rows[0];
    const userInfo = {
      userId,
      firstName,
      lastName,
      email,
      userType,
      phoneNumber,
    };
    res.status(200).json({
      message: 'Phone number added successfully',
      userInfo,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
