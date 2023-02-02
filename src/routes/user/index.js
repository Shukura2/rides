import express from 'express';
import multer from 'multer';
import {
  editUserProfile,
  uploadProfilePic,
  resetPassword,
  updatePassword,
  addPhoneNumber,
} from '../../controllers';
import { isLoggedIn } from '../../middlewares';

const userRouter = express.Router();

const storage = multer.memoryStorage();
const maxSize = 1000000 * 1000;

export const uploads = multer({ storage, limits: { fileSize: maxSize } });

userRouter.put('/edit-profile', isLoggedIn, editUserProfile);
userRouter.post('/reset-password', resetPassword);
userRouter.put('/update-password', updatePassword);
userRouter.put('/add-phone-number', isLoggedIn, addPhoneNumber)
userRouter.post(
  '/upload',
  isLoggedIn,
  uploads.single('image'),
  uploadProfilePic
);

export default userRouter;
