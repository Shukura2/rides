import bcrypt from 'bcrypt';
import Model from '../../models/model';
import assignToken from '../../utils/assignToken';

export const userModel = new Model('user_details');

export const userTypes = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
};

export const createPassenger = async (req, res) => {
  let userType = userTypes.PASSENGER;
  const { firstName, lastName, password, email } = req.body;

  const columns = `first_name, last_name, password, email, user_type`;
  const values = `'${firstName}', '${lastName}', '${password}', '${email}', '${userType}'`;

  try {
    const data = await userModel.insertWithReturn(columns, values);
    const { user_details_id: userId } = data.rows[0];
    const userData = `phone_number, profile_pic`;
    const userClause = `WHERE user_details_id = '${userId}'`;
    const userDetails = await userModel.select(userData, userClause);
    const { phone_number: phoneNumber, profile_pic: profilePic } =
      userDetails.rows[0];
    const userInfo = {
      userId,
      firstName,
      lastName,
      email,
      userType,
      phoneNumber,
      profilePic,
    };
    const token = assignToken(userInfo);
    res.status(200).json({
      message: 'Register successfully',
      userInfo,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const createDriver = async (req, res) => {
  let userType = userTypes.DRIVER;
  const { firstName, lastName, password, email } = req.body;
  const columns = `first_name, last_name, password, email, user_type`;
  const values = `'${firstName}', '${lastName}', '${password}', '${email}', '${userType}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);
    const { user_details_id: userId } = data.rows[0];
    const userData = `phone_number, profile_pic`;
    const userClause = `WHERE user_details_id = '${userId}'`;
    const userDetails = await userModel.select(userData, userClause);
    const { phone_number: phoneNumber, profile_pic: profilePic } =
      userDetails.rows[0];
    const userInfo = {
      userId,
      firstName,
      lastName,
      email,
      userType,
      phoneNumber,
      profilePic,
    };
    const token = assignToken(userInfo);
    res.status(200).json({
      message: 'Register successfully',
      userInfo,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validateEmail = await userModel.select(
      '*',
      ` WHERE email = '${email}'`
    );
    if (!validateEmail.rowCount) {
      return res
        .status(400)
        .json({ message: 'Email or password is incorrect', success: false });
    }
    const validatePassword = await bcrypt.compare(
      password,
      validateEmail.rows[0].password
    );
    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: 'Email or password is incorrect', success: false });
    }
    const {
      user_details_id: userId,
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      phone_number: phoneNumber,
      profile_pic: profilePic,
    } = validateEmail.rows[0];
    const userInfo = {
      userId,
      firstName,
      lastName,
      email,
      userType,
      phoneNumber,
      profilePic,
    };
    const token = assignToken(userInfo);
    return res
      .status(200)
      .json({ message: 'Login Successfully', userInfo, token, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
