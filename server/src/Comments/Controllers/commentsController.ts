import { Request, Response } from "express";
import CommentsService from "../Service/commentsService"
import BlogsService from "../../Blogs/Service/BlogsService";
import { CommentsContract } from "../Repositories/CommentsRepositories";
import BlogContract from "../../Blogs/Repositories/BlogRepositories";

export default class CommentController 
{
  private commentService:CommentsContract
  private blogService : BlogContract
  constructor()
  {
    this.commentService= new CommentsService();
    this.blogService= new BlogsService();
  }
   postComment = async (req: Request, res: Response) => {
    const loggedUserId = req.user?.id;
    const { id: blogId } = req.params;
    const { comment } = req.body;
    console.log("req is", req.body);
    const inputs={
      loggedUserId,
      blogId,
      comment
    }
    try {
      if(await this.blogService.ifBlogExists(+blogId))
      {
        res.json(await this.commentService.createComment(inputs))
        return 
      }
      res.status(404).send("Blog doesnt exists");
      return
    } catch (error) {
      console.log(error)
      res.status(500).send("Not able to post Comment")
    }
  };

  editComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { comment: newComment } = req.body;
    const loggedUserId = req.user?.id;
    const inputs = {commentId,newComment,loggedUserId};
    
    try {
      res.json(await this.commentService.updateComment(inputs));
    } catch (error) {
      res.status(500).send("Not able to Comment")
    }
  };

  deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const loggedUserId = req.user?.id;
    const inputs = {commentId,loggedUserId};
    
    try {
      res.json(this.commentService.deleteComment(inputs))
    } catch (error) {
      res.status(500).send("Not able to delete the Commnet");
    }
  };

   postReply = async (req: Request, res: Response) => {
    const { id: blogId, commentId } = req.params;
    const { reply } = req.body;
    const loggedUserId = req.user?.id;
    const inputs = {blogId,commentId,reply,loggedUserId};
    
    try {
      res.json(await this.commentService.postReply(inputs));
    } catch (error) {
      res.status(500).send("Not able to post comment");
    }
  };

   deleteReply = async (req: Request, res: Response) => {
    const { replyId } = req.params;
    const loggedUserId = req.user?.id;
    const inputs = {replyId,loggedUserId};
    
    try {
      res.json(await this.commentService.deleteReply(inputs))
    } catch (error) {
      
    }
  };
  
}









