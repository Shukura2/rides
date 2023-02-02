import { userModel } from "./auth/userAuth";

export const addPhoneNumber = async (req, res) => {
  const data = req.body;

  const newData = {};

  if (data.phoneNumber) {
    newData['phone_number'] = data.phoneNumber;
  }
  const { userId } = req.user.userInfo;
  const clause = `WHERE user_details_id = '${userId}'`;
  try {
    const addPhoneNumber = await userModel.editFromTable(newData, clause);
    res.status(200).json({ message: 'Phone number added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
