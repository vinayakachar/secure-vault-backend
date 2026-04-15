import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";


const verfifyToken=asyncHandler(async(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    const verified=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET );
    req.user=verified;
    next();
})

export default verfifyToken;    
