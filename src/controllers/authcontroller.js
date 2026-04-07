import bycrypt from 'bcrypt';

let users=[];
const registerUser=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.status(400).json({message:"Plese provide valid username and passoword"})
    }

    const existedUser=users.find(user=>user.username===username);
    if(existedUser){
        res.status(400).json({message:"User already exists"});
    }

    const hashedpassword=await bycrypt.hash(password,10);

    const newUser={username,password:hashedpassword};
    users.push(newUser);

    res.status(201).json({message:"User registered successfully"});
    



}

export {registerUser};