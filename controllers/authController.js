///iss function ko async kr lenge jisse hume request or response milega 
//then isme try catch ko add krna h taki error ko v handle kr sakke hum
//try
//user modle ko import krenge 
//user details ko get krna h example - name email password phone address 
//then validation krenge fir hum 
//existing users ko check krenge -- as we want unique users 
//agr existing user nhi h toh register krayenge uske liye 
//jo password aa ra h usse hassh krayenge uske liye ek plain password ko input krayenge 
//fir usse save krayenge or uski details bhej denge 
//

import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import  Jwt  from "jsonwebtoken";


export const registerController =async (req,res) =>{
try {
    const {name,email,password,phone,address}=req.body;
    //validations 
   if (!name ){
    return res.send({error : 'Name is required '})
   }
   if (!email ){
    return res.send({error : 'Email Address is required '})
   }
   if (!password ){
    return res.send({error : 'Password is required '})
   }
   if (!phone ){
    return res.send({error : 'Phone Number  is required '})
   }
   if (!address ){
    return res.send({error : 'Address is required '})
   }

   //check for existing user 
   const existingUser = await userModel.findOne({email});
   if(existingUser){
    return res.status(200).send({
        success:true,
        message:'Already A User please Login',
    })
   }

   //register user 
   const hashedPassword =await hashPassword(password);
// save user 
const user=await new userModel({name,email,phone,address,password:hashedPassword}).save()
res.status(201).send({
    success:true,
    message:'User Register Successfully',
    user
})

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in Registration ',
        error
    })
}


}

// NEW ROUTE CREATE KRENGE TO USE JWT TO MAKE IT MORE SECURE 
//METHOD POST RAHEGA
export const loginController =async(req,res) =>{
    try {
        const {email,password}=req.body

        //validation 
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password '
            })
        }
        //check user 
        const user =await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email Not Registered '
            })

        }
        const match =await comparePassword(password,user.password)
        if(!match){
            return res.status(404).send({
                success:false,
                message:'Invalid password '
            })
        }
        //token 
       const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
       return res.status(200).send({
        success:true,
        message:'login  success ',
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
        },token,
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login ',
            error
        })
    }


};

//test controller
export const testController =(req,res)=>{
    res.send("protected route ");

};