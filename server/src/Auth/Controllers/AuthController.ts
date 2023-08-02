import express from 'express'
import { login, loginPage, signUp } from '../Service/AuthService';
import { validationMiddleware } from '../../Validation/validate';
import {SignupDto,LoginDto} from '../Service/Dto'
import passport from 'passport';

const router = express.Router();

router.get('/LoginPage',loginPage)
router.post('/Login', validationMiddleware(LoginDto),login);
router.post('/SignUp', validationMiddleware(SignupDto),signUp);
router.get('/google', passport.authenticate('google',{scope:["email", "profile"],}))
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect('/blogs')
  });


export =router;



