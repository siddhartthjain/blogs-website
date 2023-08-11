import { Request, Response } from "express";
import Blogs from "../../db/models/blogs";
import User from "../../db/models/user";
import Comments from "../../db/models/comments";
import Likes from "../../db/models/likes";
import { Op } from "sequelize";


const ifCommentExists = async (id: number) => {
    const CommentExists = await Comments.findByPk(id);
    if(CommentExists?.parentId!=null)
    {
      return null;
    }
    return CommentExists;
  };

  const ifBlogExists = async (id: number) => {
    const blogExists = await Blogs.findByPk(id);
    return blogExists;
  };

export const postComment = async (req: Request, res: Response) => {
    const loggedUserId = req.user?.id;
    const { id: blogId } = req.params;
    const { comment } = req.body;
    try {
      await Comments.create({
        userId: loggedUserId,
        blogId: +blogId,
        comment: comment,
      });
      res.status(200).json({ message: "Commented succesfully" });
    } catch (error) {
      res.status(500).json({ error: "Not able to Comment on Blog" });
    }
  };
  
  export const editComment = async (req: Request, res: Response)=>
  {
    const {commentId}= req.params;
    const {comment: newComment} = req.body;
    const loggedUserId= req.user?.id;
    try {
      
      const comment= await Comments.findByPk(commentId);
      if(comment&& loggedUserId === comment.userId)
      {
         comment.update({comment:newComment});
         res.status(200).json({message: "Comment Edited Succesfully"});
         return;
      }
      else{
        res.status(400).json({error: "Comment cant be edited"})
        return;
      }
    } catch (error) {
      res.status(500).json({error: "not able to delet comment"});
    }
  }
  
  export const deleteComment =async (req:Request, res:Response) => {
   
    const {commentId}= req.params;
    const loggedUserId = req.user?.id;
    const comment =  await Comments.findByPk(commentId);
    try {
      
      if(comment && comment.userId===loggedUserId)
    {
      const row= await comment.destroy();
      if(+row>=0)
      {
        res.status(200).json({message:"Comment deleted succesfully"});
        return;
      }
      else
      {
        res.status(400).json({error:"Not able to delete the comment"});
      }
  
    }
    else{
      res.status(400).json({error: "You are not allowed to delete Comment"});
      return ;
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Not able to delete Comment"})
    }
    
    
  }
  
  export const postReply = async (req: Request, res: Response) => {
    const { id:blogId, commentId } = req.params;
    const { reply } = req.body;
    const loggedUserId = req.user?.id;
  
    try {
      if ((await ifBlogExists(+blogId)) && (await ifCommentExists(+commentId))) {
        await Comments.create({
          userId: loggedUserId,
          blogId: +blogId,
          comment: reply,
          parentId: +commentId,
        });
        res.status(200).json({message: "reply posted succesfully"})
      } else {
        res.status(400).json({ error: "Not allowed to reply" });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Not allowed to reply" });
    }
  };
  
  
  export const deleteReply =async (req:Request, res:Response) => {
   
    const {replyId}= req.params;
    const loggedUserId = req.user?.id;
    const reply =  await Comments.findByPk(replyId);
    try {
      
      if(reply && reply.userId===loggedUserId)
    {
      const row= await reply.destroy();
      if(+row>=0)
      {
        res.json({message:"Reply deleted succesfully"});
        return;
      }
      else{
        res.json({error:"Not able to delete reply"})
      }
  
    }
    else{
      res.status(400).json({error: "You are not allowed to delete Reply"});
      return ;
    }
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Not able to delete Reply"})
    }
    
    
  }
  