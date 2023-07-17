import express from 'express'
import { Login, signUp } from '../Service/UserService';

const router = express.Router();
router.get('/Login', Login);
router.post('/SignUp', signUp);



export =router;



