import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import BlogsController from './Blogs/Controllers/BlogsController';
import userController from './User/Controllers/UserController';
import db from './models'
dotenv.config();// read env file
const app = express(); // make a app from express
const PORT = process.env.PORT
// route termlogy ("path", callbackfnc);



 app.use('/blogs', BlogsController);
 app.use('/user', userController)

app.get("/", (req :Request ,res: Response)=>  
{
   res.send("Express and typescript server");
})
// app.listen (portno,callback(if succesfull)) 
db.sequelize.then(()=>
{ app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})})
   