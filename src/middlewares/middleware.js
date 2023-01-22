import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { passengerModel, driverModel } from '../controllers';

export const validateSignup = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(12).required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    return next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const validateExistingPassenger = async (req, res, next) => {
  const { email } = req.body;
  try {
    const validateEmail = await passengerModel.select(
      '*',
      ` WHERE "email"= '${email}'`
    );
    if (validateEmail.rowCount) {
      return res
        .status(400)
        .json({ message: 'User already exist', success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const validateExistingDriver = async (req, res, next) => {
  const { email } = req.body;
  try {
    const validateEmail = await driverModel.select(
      '*',
      ` WHERE "email"= '${email}'`
    );
    if (validateEmail.rowCount) {
      return res
        .status(400)
        .json({ message: 'User already exist', success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  let tokenValue;
  try {
    if (token) {
      [, tokenValue] = token.split(' ');
      const userData = jwt.verify(tokenValue, process.env.SECRET_KEY);
      req.user = userData;
      if (userData) {
        next();
      } else {
        res.status(401).json({
          message: 'Authentication token is invalid or expired',
          success: false,
        });
      }
    } else {
      res.status(401).json({
        message: 'Authentication token does not exist',
        success: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication token is invalid or expired',
    });
  }
};

export const validatePhoneNumber = async (req, res, next) => {
  const schema = Joi.object({
    phoneNumber: Joi.string().length(11).required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
