import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthService from "../Service/AuthService";
import AuthContract from "../Repositories/AuthRepo";
import generateOtp   from "../utility/generateOtp"
import { hdel, hget, hset } from "../../db/Redis/RedisService";
import {sendOTPMail} from "../../config/nodeMailer";
dotenv.config();

export default class AuthController {
  private authService: AuthContract;
  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (req: Request, res: Response) => {
    const userBody = req.body;
    const password = userBody.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    userBody.password = hashedPassword;
    try {
      const userExists = await this.authService.findOneEmail(userBody.email);
     
      if (userExists) {
        res.status(400).json({ message: "User already exists" });
      } else {
          const genOtp= generateOtp(4);
          try {
            await hset(`user:${userBody.email}`,{...userBody , otp: genOtp});
            console.log("setting otp:", genOtp);
          await sendOTPMail(genOtp,userBody.email);
          res.json({message: "Otp sent succesfully to your email"});
          } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Something went wrong "});
          }
          
        // res.json({message :await this.authService.createUser(userBody)});
      }
    } catch (error) {
      console.log(error);
       res.json({ error: "error in creating user" });
    }
  };
  // create function storeuserdatainDb function in whcih you will get the data from redis and check with otp filled from frontend and if valid then create user 

  verifyOtpAndCreateUser=async (req:Request , res: Response) => {
    try {
      const {email,otp}= req.body;
      const key = `user:${email}`
      const userData = await hget(key);
      const userBody = {...userData};

      if(userData)
      {
            console.log(userData.otp)
            if(otp==userData.otp)
            {
              console.log("Otp matched")
              await hdel(key);
              return res.json(await this.authService.createUser(userBody));
            }
            else{
               throw Error("Otp Not matched")
            }

      }
      else{
         throw Error("Not able to find the Otp")
      }
     
    } catch (error) {
      console.log(error);
      return  res.json({ error: "error in creating user" });
    }
    
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userExists = await this.authService.findOneEmail(email);
      if (userExists) {
        const userPassword = userExists?.password;

        const passMatched: boolean = bcrypt.compareSync(password, userPassword);
        if (passMatched) {
          const secretKey: string = process.env.SECRET_KEY as string;
          const payload = { id: userExists.id, email: userExists.email };
          const token = jwt.sign(payload, secretKey, { expiresIn: "6d" });
          const response= {userId: userExists.id, token:token};
          res.json({ message: "succesfully logged in",response });
        } else {
          throw new Error("password is wrong");
        }
      } else {
        throw new Error("User Doesnt Exists Please Sign in");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  };
  loginPage = (req: Request, res: Response) => {
    res.render("login");
  };
}
