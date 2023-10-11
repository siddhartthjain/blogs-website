import User from "../../db/models/user"
import AuthContract from "../Repositories/AuthRepo"

export default class AuthService implements AuthContract
{
   findOneEmail = async (email:string) => {
      return User.findOne({where :{email: email}})
   }

   createUser=async (inputs:Record<string,any>) => {
    try {
       const {name, email, password}= inputs
       const user =  await User.create({name,email,password});
        return ({resp:`user has been created with ${user.id}`} );
    } catch (error) {
      console.log(error);
        throw new Error ("Not able to Create New User");
        
    }
    
   }
}