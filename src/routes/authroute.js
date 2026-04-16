import express from 'express';
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/authcontroller.js';
import verfifyToken from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)
router.get('/my-vault',verfifyToken,(req,res)=>{
    res.status(200).json(
        {message: `Welcome to the vault, ${req.user.username}!`,
        secretData: "This data is only visible because your JWT is valid."});
})
router.post('/logout',logoutUser);

router.post('/refresh-token',refreshAccessToken);
export default router;