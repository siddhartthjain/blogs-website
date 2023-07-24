import express from 'express'
import { login, signUp } from '../Service/AuthService';
import { validationMiddleware } from '../../Validation/validate';
import {SignupDto,LoginDto} from '../Service/Dto'

const router = express.Router();

router.get('/Login', validationMiddleware(LoginDto),login);
router.post('/SignUp', validationMiddleware(SignupDto),signUp);



export =router;



