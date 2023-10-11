import { Op } from "sequelize";
import Likes from "../../db/models/likes"
import LikeContract from "../Repositories/LikeRepositories"

export default class LikesService implements LikeContract
{
    createLike=async (inputs:Record<string,any>) => {
        const {userId, blogId}= inputs
        try {
            await Likes.create({userId, blogId});
             return true; 
        } catch (error) {
            console.log(error);
            throw new Error ("not abel to Like blog");
        } 
    }
    destroyIfBlogIdUserId=async (inputs:Record<string,any>) => {
        const {blogId, loggedUserId}= inputs;
        return await Likes.destroy({
            where: {
              [Op.and]: [{ blogId: blogId }, { userId: loggedUserId }],
            },
          });
        
    }
}