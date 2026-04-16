import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';


const registerUser=asyncHandler(async (req, res) => {
    const {username,password}=req.body;
    if(!username || !password){
         return res.status(400).json({message:"Plese provide valid username and passoword"})
    }

    const existedUser=await User.findOne({username});
    if(existedUser){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedpassword=await bycrypt.hash(password,10);

    const newUser=await User.create({username,password:hashedpassword});

    res.status(201).json({message:`User ${newUser.username} registered successfully`,
        id:newUser._id
    });
}
);

const loginUser=asyncHandler(async (req, res) => {
    const {username,password}=req.body;
        if(!username || !password){
           return res.status(400).json({message:"Please provide valid username and password"});
        }
        const user=await User.findOne({username});
       
        if(!user || !(await bycrypt.compare(password,user.password))){
            return res.status(400).json({message:"Invalid username or password"});
        }

        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);

         res.status(200).json({
            message:"Login successful",
            accessToken,
            refreshToken
        });

});

const generateAccessToken=(user)=>{
    return jwt.sign({id:user.id,username:user.username},
        process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'}
    )
}

const generateRefreshToken=(user)=>{
    return jwt.sign({id:user.id,username:user.username},
        process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'}
    )
}

export {registerUser,loginUser};