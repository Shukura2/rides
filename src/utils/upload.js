const cloudinary = require('cloudinary').v2;
import path from 'path';
import DataURIParser from 'datauri/parser';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const dUri = new DataURIParser();

export const dataUri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export const uploadToCloud = async (file, folderName) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(file, {
      folder: folderName,
    });
    return secure_url;
  } catch (error) {
    throw error;
  }
};
