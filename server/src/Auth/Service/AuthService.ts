import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../../db/models/user";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const  signUp= async (req: Request,  res: Response)=>
{
  const userBody = req.body;
  const password = userBody.password;
  const hashedPassword= bcrypt.hashSync(password,10);
  userBody.password= hashedPassword;
  try {
   const userExists= await User.findOne({where: {email: userBody.email}});
   if(userExists)
   {
      res.status(400).json({message: "User already exists"});
   }
   else{
     const user = await User.create(userBody);
   console.log(`user has been created with ${user.id}` );
   res.json({message:"User has been created"}) 
   }
   
  } catch (error) {
   console.log(error);
    res.json({error: "error in creating user"});
  }
}

export const login = async (req:Request , res : Response)=>
{
   
   try {
       const {email,password}= req.body;
       
   const userExists= await User.findOne({where:{email:email}});
   if(userExists)
   {
    const userPassword = userExists?.password;
   
   const passMatched:boolean = bcrypt.compareSync(password,userPassword);  
   if(passMatched)
   {
      const secretKey:string= process.env.SECRET_KEY as string;
      const payload = {id: userExists.id, email:userExists.email}
      const token = jwt.sign(payload, secretKey, {expiresIn :'6d'})
      res.json({message: "succesfully logged in",token});
   }
   else{
      throw new Error("password is wrong");
   }
   }
   else{
      throw new Error ("User Doesnt Exists Please Sign in")
   }
   
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
   }
  
}

export const loginPage = (req:Request, res:Response)=>
{
   res.render('login');
}