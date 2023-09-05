import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import BlogsController from './Blogs/Routes/BlogsRoutes';
import AuthController from './Auth/Routes/AuthRoutes';
import commentController from './Comments/Routes/commentsRoutes'
import TagsController from "./Tags/Controller/tagsController"
import bodyParser from 'body-parser';
import dbInit from './db/init';
import "./config/passport";
import session from 'express-session';
import passport from 'passport';
import * as swaggerDocument from './swagger.json'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();// read env file
const app = express(); // make a app from express
const PORT = process.env.PORT

// route termlogy ("path", callbackfnc);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbInit();


app.set('view engine', "ejs")

app.get("/", (req :Request ,res: Response)=>  
{
   res.send("Express and typescript server");
})
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"}))

 
app.use('/Blogs/:id/comment', commentController);  
app.use("/Blogs/:id/Tags", TagsController) 
 app.use('/Blogs', BlogsController);
 app.use('/Auth', AuthController);
 
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

export default app;