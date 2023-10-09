import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const authMiddleware = (req:Request, res: Response, next: NextFunction)=>
{
    
   

    try {
        const secretKey= process.env.SECRET_KEY as string;
        const token = req.header('Authorization')?.replace('Bearer ',"");
        
        if(!token)
        {
            throw new Error();
        }
        const decoded= jwt.verify(token,secretKey) as Record<string,any>;
        console.log('decoded value is', decoded);
        req.user= decoded
        
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}