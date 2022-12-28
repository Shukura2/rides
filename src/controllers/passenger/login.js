import bcrypt from 'bcrypt';
import { passengerModel } from './signUp';
import assignToken from '../../utils/assignToken';

export const loginPassenger = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validateEmail = await passengerModel.select(
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
      passenger_id: passengerId,
      first_name: firstName,
      last_name: lastName,
    } = validateEmail.rows[0];
    const userInfo = { passengerId, firstName, lastName, email };
    const token = assignToken(userInfo);
    return res
      .status(200)
      .json({ message: 'Login Successfully', userInfo, token, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
