import express from "express";
import bcrypt from 'bcrypt';


const blogRouter = express.Router();

blogRouter.get('/', async(req,res)=>{
    if (req.isAuthenticated()) {
        // res.send(req.body);
        res.send("Home Page");
    } else {
        res.redirect("/login");
    }
})

export default blogRouter;