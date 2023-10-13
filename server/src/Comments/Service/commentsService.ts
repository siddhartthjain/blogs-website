import { threadId } from "worker_threads";
import BlogsService from "../../Blogs/Service/BlogsService";
import Comments from "../../db/models/comments";
import {CommentsContract} from "../Repositories/CommentsRepositories"


export default class CommentsService implements CommentsContract{
  
  ifCommentExists = async (id: number) => {
    const CommentExists = await Comments.findByPk(id);
    if (CommentExists?.parentId != null) {
      return null;
    }
    return CommentExists;
  };

  createComment = async (inputs: Record<string, any>) => {
    const { blogId, loggedUserId, comment } = inputs;
    console.log("inputs are,", inputs);
    try {
      const createdComment = await Comments.create({
        userId: loggedUserId,
        blogId: +blogId,
        comment: comment,
      });
      return createdComment.dataValues;
    } catch (error) {
      throw new Error("Not able to post Comment");
    }
  };

  updateComment = async (inputs: Record<string, any>) => {
    const { commentId, loggedUserId, newComment } = inputs;
    try {
      const comment = await Comments.findByPk(commentId);
      if (comment && loggedUserId === comment.userId) {
        comment.update({ comment: newComment });
        return {resp: "Comment Edited Succesfully"};
        return;
      } else {
        return {resp:"You are Not allowed to upadte Comment"};
      }
    } catch (error) {
      throw new Error("Not able to edit comment");
    }
  };
  deleteComment = async (inputs: Record<string, any>) => {
    const { commentId, loggedUserId } = inputs;
    const comment = await Comments.findByPk(commentId);
    try {
      if (comment && comment.userId === loggedUserId) {
        const row = await comment.destroy();
        if (+row >= 0) {
          return {resp:"Comment deleted Sucessfully"};
        } else {
          return {resp:"Not able to delete Comment"};
        }
      } else {
        return {resp:"You are not allowed to delete Comment"};
      }
    } catch (error) {
      console.log(error);
      throw new Error("Not able to delete Comment");
    }
  };
  postReply = async (inputs: Record<string, any>) => {
    const blogService = new BlogsService();
    const { commentId, loggedUserId, blogId, reply } = inputs;
    try {
      if (
        (await blogService.ifBlogExists(+blogId)) &&
        (await this.ifCommentExists(+commentId))
      ) {
        const createdReply = await Comments.create({
          userId: loggedUserId,
          blogId: +blogId,
          comment: reply,
          parentId: +commentId,
        });
        return createdReply.dataValues;
      } else {
        return {resp:"Not allowed to reply"};
      }
    } catch (error) {
      console.log(error);
      throw new Error("not able to post reply");
    }
  };

  deleteReply = async (inputs:Record<string,any>) => {
    const {replyId,loggedUserId} = inputs;
    const reply = await Comments.findByPk(replyId);
  try {
    if (reply && reply.userId === loggedUserId) {
      const row = await reply.destroy();
      if (+row >= 0) {
        return "reply deleted Succesfully";
        return;
      } else {
        return "Not able to delete reply" 
      }
    } else {
      
      return "Not able to delete reply" 
    }
  } catch (error) {
    console.log(error);
     throw new Error ("Not able to delete reply" );
  }
    
  }
}
