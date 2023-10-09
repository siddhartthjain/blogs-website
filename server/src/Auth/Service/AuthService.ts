import User from "../../db/models/user"
import AuthContract from "../Repositories/AuthRepo"

export default class AuthService implements AuthContract
{
   findOneEmail = async (email:string) => {
      return User.findOne({where :{email: email}})
   }

   createUser=async (inputs:User) => {
    try {
       const user =  await User.create(inputs);
        return (`user has been created with ${user.id}` );
    } catch (error) {
      console.log(error);
        throw new Error ("Not able to Create New User");
        
    }
    
   }
}