import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let users=[];

const registerUser=async(req,res)=>{
    try{
    const {username,password}=req.body;
    if(!username || !password){
         return res.status(400).json({message:"Plese provide valid username and passoword"})
    }

    const existedUser=users.find(user=>user.username===username);
    if(existedUser){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedpassword=await bycrypt.hash(password,10);

    const newUser={id:Date.now().toString(),username,password:hashedpassword};
    users.push(newUser);

    res.status(201).json({message:"User registered successfully" });
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
           return res.status(400).json({message:"Please provide valid username and password"});
        }
        const user=users.find(user=>user.username===username);
       
        if(!user ){
            return res.status(400).json({message:"Invalid username or password"});
        }
    
         const isPasswordValid=await bycrypt.compare(password,user.password);
       if(!isPasswordValid){
           return res.status(400).json({message:"Invalid username or password"});
        }

        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);

         res.status(200).json({
            message:"Login successful",
            accessToken,
            refreshToken
        });
         console.log(users);


    }
        catch(error){
            res.status(500).json({message:"server error",error:error.message});
        }

}

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