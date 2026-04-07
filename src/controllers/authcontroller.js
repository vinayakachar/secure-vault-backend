import bycrypt from 'bcrypt';

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
         res.status(200).json({message:"Login successful"});
    }
        catch(error){
            res.status(500).json({message:"server error",error:error.message});
        }

}

export {registerUser,loginUser};