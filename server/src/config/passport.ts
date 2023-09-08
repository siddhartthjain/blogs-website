import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import User from "../db/models/user";
import jwt from 'jsonwebtoken'
const GoogleStrategy = passportGoogle.Strategy;


passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(async (id:number, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/redirect",
    
    },
    async (accessToken, refreshToken, profile:any, done) => {
      if(profile)
      {
         const {emails, displayName, provider}= profile;
         const userEmailid= emails?emails[0].value as string  : ""
         const userName = displayName as string;
         const userProvider= provider as string;
         let user =null;
         user=await User.findOne({where:{email: userEmailid}});
         if(!user)
         {
            user =await User.create({name:userName,email:userEmailid, provider:userProvider});
         }
          
         const secretKey:string= process.env.SECRET_KEY as string;
      const payload = {id: user.id, email:user.email}
      const token = jwt.sign(payload, secretKey, {expiresIn :'6d'})
      done(null,token);
      }
    
    }
  )
);