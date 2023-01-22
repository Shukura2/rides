import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Model from '../../models/model';
import assignToken from '../../utils/assignToken';
import sendEmail from '../../utils/sendMail';

dotenv.config();

export const passengerModel = new Model('passenger');
const SALTROUND = 10;

export const createPassenger = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const columns = `"first_name", "last_name", "email", "password"`;
  const values = `'${firstName}', '${lastName}', '${email}', '${password}'`;

  try {
    const data = await passengerModel.insertWithReturn(columns, values);
    const { passenger_id: passengerId } = data.rows[0];
    const userInfo = { passengerId, firstName, lastName, email };
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

export const resetPassword = async (req, res) => {
  const title = 'Reset Password';
  const FRONTEND_URL = process.env.FRONTEND_URL;
  try {
    const { email } = req.body;
    const validateEmail = await passengerModel.select(
      '*',
      `WHERE email = '${email}'`
    );

    if (!validateEmail.rowCount) {
      return res.status(404).json({
        message: 'Account with email address does not exist',
        success: false,
      });
    }
    const { passenger_id: passengerId } = validateEmail.rows[0];
    const userInfo = { passengerId };
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

export const updatePassword = async (req, res) => {
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
    const { passengerId } = userData.userInfo;
    const hashPassword = await bcrypt.hash(password, SALTROUND);
    const clause = `WHERE passenger_id = '${passengerId}'`;
    const data = await passengerModel.editFromTable(
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

export const addPhoneNumber = async (req, res) => {
  const data = req.body;

  const newData = {};

  if (data.phoneNumber) {
    newData['phone_number'] = data.phoneNumber;
  }
  const { passengerId } = req.user.userInfo;
  const clause = `WHERE passenger_id = '${passengerId}'`;
  try {
    const addPhoneNumber = await passengerModel.editFromTable(newData, clause);
    res.status(200).json({ message: 'Phone number added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
