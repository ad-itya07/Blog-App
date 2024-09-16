import dotenv from 'dotenv';
dotenv.config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};

export default sessionConfig;
