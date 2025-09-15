import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false , message: "User does not exist "});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success: false, message:"Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({success: true , token});
    }
    catch(error){
        console.log(error);
        res.json({success: false , message:" some  error occured "});
    }
}
// register user 
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try{
        //checking if user already exists or not 
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false , message :"User Already exists "})
        }

        console.log(name+email+password);
        // validating strong password
        if(!validator.isEmail(email)){
            return res.json({success: false , message:"please Enter valid email"})
        }
        if(password.length<8){
            return res.json({success: false , message:" Enter Strong password"})
        }
        // hashing user password using bcrypt
        console.log('after condn ');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUser = new userModel({
            name: name ,
            email : email , 
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true , token});

    } catch(error){
        console.log(error);
        res.json({success: false , message :"Error occured "});
    }
}

export {loginUser,registerUser};