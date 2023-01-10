import passport from 'passport';
import dotenv from 'dotenv';
import Model from '../models/model';

const passengerModel = new Model('passenger');

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
      const {
        id: passengerId,
        given_name: firstName,
        family_name: lastName,
        picture: profilePic,
        email: email,
      } = profile;

      const user = { passengerId, firstName, lastName, profilePic, email };
      const columns = `*`;
      const clause = `WHERE email='${email}'`;
      try {
        const cA = await passengerModel.select(columns, clause);
        if (!cA.rowCount) {
          const columns = `"first_name", "last_name", "email", "profile_pic"`;
          const values = `'${firstName}', '${lastName}', '${email}', '${profilePic}'`;
          const addUser = passengerModel.insertWithReturn(columns, values);
        }
        const user = {
          email: email,
        };
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
