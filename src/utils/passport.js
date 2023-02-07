import passport from 'passport';
import dotenv from 'dotenv';
import { userModel, userTypes } from '../controllers';

dotenv.config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const {
          given_name: firstName,
          family_name: lastName,
          picture: profilePic,
          email,
        } = profile;

        const columns = `*`;
        const clause = `WHERE email='${email}'`;
        let userType = userTypes.PASSENGER;
        let userInfo;

        const currentUser = await userModel.select(columns, clause);
        if (!currentUser.rowCount) {
          const columns = `first_name, last_name, email, user_type, profile_pic`;
          const values = `'${firstName}', '${lastName}', '${email}', '${userType}', '${profilePic}'`;
          const addUser = await userModel.insertWithReturn(columns, values);
          const { user_details_id: userId } = addUser.rows[0];
          userInfo = {
            userId,
            firstName,
            lastName,
            email,
            profilePic,
            userType,
          };
        } else {
          userInfo = {
            userId: currentUser.rows[0].user_details_id,
            firstName: currentUser.rows[0].first_name,
            lastName: currentUser.rows[0].last_name,
            email: currentUser.rows[0].email,
            profilePic: currentUser.rows[0].profile_pic,
            userType: currentUser.rows[0].user_type,
          };
        }
        done(null, userInfo);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (userInfo, done) {
  done(null, userInfo);
});

passport.deserializeUser(function (userInfo, done) {
  done(null, userInfo);
});
