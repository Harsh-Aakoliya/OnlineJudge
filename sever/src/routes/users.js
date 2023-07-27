import  express  from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router=express.Router();


router.post("/register",async(req,res)=>{
    //we get username and password from frontend using post method
    const {username,password}=req.body;

    //for authlentication we need to goto User collection(model)
    const user=await UserModel.findOne({username:username});//here first username is of collection and second is of above (got from frontend) 2) UserMode.findOne() is returning one promises so we need to use either .then and .catch or async and await

    // res.json(user);

    if(user){
        return res.json({message:"User already exists!"})
    }

    //if it not exist then first we bcrypt it or hash it 
    const hashedPassword=await bcrypt.hash(password,10);
    
    //now for user we have collection UserModel so to add it into db
    const newUser=new UserModel({username:username,password:hashedPassword});
    
    await newUser.save();


     res.json({message:"User Registered Successfully"});
});


router.post("/login",async(req,res)=>{
     const {username,password}=req.body;
     const user=await UserModel.findOne({username});
     if(!user){
        return res.json({message:"User not registed"})
     }
     //now what ever password is there in database inform of hashed we can't unhash it again now to check if DB pass and entered pass is same or not is that if we hash entered pass and it matches with db pass then true else false
     //here first password field in compare() is hashed entered pass
     const isPasswordValid= await bcrypt.compare(password,user.password);

     if(!isPasswordValid){
        return res.json({message:"Username or Password is Incorrect"});
     }

     //"secret" is for does user 
     const token=jwt.sign({id:user._id},"secret");
     res.json({token,userID:user._id});
});
export{router as userRouter}
