import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const SENDER = process.env.SENDER;

const sendEmail = async (recipent, title, content) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    to: recipent,
    from: SENDER,
    subject: title,
    html: content,
  };

  const info = await sgMail.send(message);
};

export default sendEmail;
