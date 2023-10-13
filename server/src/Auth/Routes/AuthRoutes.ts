import express from 'express'
import  AuthController from '../Controller/AuthController';
import { validationMiddleware } from '../../Validation/validate';
import {SignupDto,LoginDto, VerifyDto} from '../Dto'
import passport from 'passport';

const router = express.Router();
const authController = new AuthController();
router.get('/LoginPage',authController.loginPage)
router.post('/Login', validationMiddleware(LoginDto),authController.login);
router.post('/SignUp', validationMiddleware(SignupDto),authController.signUp);
router.post('/verifyEmail',validationMiddleware(VerifyDto) , authController.verifyOtpAndCreateUser);
router.get('/google', passport.authenticate('google',{scope:["email", "profile"],}))
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    
  if(req.user)
  {
     res.json({message:"Ypu have succesfully logged in", token:req.user})
  }

  });


export =router;



