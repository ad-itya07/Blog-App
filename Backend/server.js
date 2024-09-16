import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from './config/passportconfig.js';
import authRouter from './routes/authRoutes.js'
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,   
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie : {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth' , authRouter);
app.use('/blog' , blogRouter);
app.use('/user' , userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });