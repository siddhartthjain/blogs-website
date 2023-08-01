import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import BlogsController from './Blogs/Controllers/BlogsController';
import AuthController from './Auth/Controllers/AuthController';
import bodyParser from 'body-parser';
import dbInit from './db/init';
import "./config/passport";
import session from 'express-session';
import passport from 'passport';

dotenv.config();// read env file
const app = express(); // make a app from express
const PORT = process.env.PORT
// console.log("port is", PORT);
// console.log("password is ", process.env.DB_PASSWORD);
// route termlogy ("path", callbackfnc);
app.use(bodyParser.json());
// dbInit();
// console.log("i have passed db init");

app.set('view engine', "ejs")

app.get("/", (req :Request ,res: Response)=>  
{
   res.send("Express and typescript server");
})
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"}))

    
 app.use('/Blogs', BlogsController);
 app.use('/Auth', AuthController)
 
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

export default app;