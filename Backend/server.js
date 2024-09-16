import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passportconfig.js';
import authRouter from './routes/authRoutes.js'
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';
import cloudinary from './config/cloudinaryConfig.js';
import sessionConfig from './config/sessionConfig.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth' , authRouter);
app.use('/blog' , blogRouter);
app.use('/user' , userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });