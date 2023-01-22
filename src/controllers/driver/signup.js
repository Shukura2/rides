import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Model from '../../models/model';
import assignToken from '../../utils/assignToken';
import sendEmail from '../../utils/sendMail';

export const driverModel = new Model('driver');
const SALTROUND = 10;

export const createDriver = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  const columns = `first_name, last_name, password, email`;
  const values = `'${firstName}', '${lastName}', '${password}', '${email}'`;

  try {
    const data = await driverModel.insertWithReturn(columns, values);
    const { driver_id: driverId } = data.rows[0];
    const userInfo = { driverId, firstName, lastName, email };
    const token = assignToken(userInfo);
    res
      .status(200)
      .json({
        message: 'Register successfully',
        userInfo,
        token,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const resetDriverPassword = async (req, res) => {
  const title = 'Reset Password';
  const FRONTEND_URL = process.env.FRONTEND_URL;
  try {
    const { email } = req.body;
    const validateEmail = await driverModel.select(
      '*',
      `WHERE email = '${email}'`
    );

    if (!validateEmail.rowCount) {
      return res.status(404).json({
        message: 'Account with email address does not exist',
        success: false,
      });
    }
    const { driver_id: driverId } = validateEmail.rows[0];
    const userInfo = { driverId };
    const token = assignToken(userInfo);
    const verify = `${FRONTEND_URL}/password/update?token=${token}`;
    const content = `Hi, please click on the link to proceed with the reset password <a href="${verify}">Reset password</a> `;
    sendEmail(email, title, content);
    return res.status(200).json({
      message: 'We have sent a password reset instructions to your email',
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateDriverPassword = async (req, res) => {
  const { token, password } = req.body;
  let userData;
  if (!token) {
    return res.status(401).json({
      message: 'Authentication token does not exist',
      success: false,
    });
  }
  try {
    userData = jwt.verify(token, process.env.SECRET_KEY);
    const { driverId } = userData.userInfo;
    const hashPassword = await bcrypt.hash(password, SALTROUND);
    const clause = `WHERE driver_id = '${driverId}'`;
    const data = await driverModel.editFromTable(
      { password: hashPassword },
      clause
    );
    return res
      .status(200)
      .json({ message: 'Password reset successfully', success: true });
  } catch (error) {
    return res.status(400).json({
      message: 'Authentication token expired or invalid',
      success: false,
    });
  }
};
