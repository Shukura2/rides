import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { userModel } from './auth/userAuth';
import assignToken from '../utils/assignToken';
import sendEmail from '../utils/sendMail';

dotenv.config();
const SALTROUND = 10;

export const resetPassword = async (req, res) => {
  const title = 'Reset Password';
  const FRONTEND_URL = process.env.FRONTEND_URL;
  try {
    const { email } = req.body;
    const validateEmail = await userModel.select(
      '*',
      `WHERE email = '${email}'`
    );

    if (!validateEmail.rowCount) {
      return res.status(404).json({
        message: 'Account with email address does not exist',
        success: false,
      });
    }
    const { user_details_id: userId } = validateEmail.rows[0];
    const userInfo = { userId };
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
    const { userId } = userData.userInfo;
    const hashPassword = await bcrypt.hash(password, SALTROUND);
    const clause = `WHERE user_details_id = '${userId}'`;
    const data = await userModel.editFromTable(
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
