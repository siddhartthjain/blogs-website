import { Request, Response } from "express";
import Blogs from "../../db/models/blogs";
import User from "../../db/models/user";
import Comments from "../../db/models/comments";
import Likes from "../../db/models/likes";

import BlogsService from "../Service/BlogsService"
import LikeService from "../Service/LikesService"
import BlogContract from "../Repositories/BlogRepositories";
import LikeContract from "../Repositories/LikeRepositories";

    export class BlogController
    {
      private blogService:BlogContract;
      private likeService: LikeContract;
      constructor(){
        this.blogService= new BlogsService()
        this.likeService= new LikeService()
      }

      getAllBlogs = async (req: Request, res: Response) => {

        
        // get all blogs for all user
        // console.log("blogs associations", Blogs.associations)
       
          const { userId, blogId, items, page, sort, tags } = req.query;
          
          const inputs = req.query;
          console.log("inputs are",inputs);
          if(req.params.id)
          {
            inputs.blogId= req.params.id;
          }
          inputs.user = req.user?.id
          try {
            res.json(await this.blogService.getAllBlog(inputs));
          } catch (error) {
            console.log(error)
            res.status(500).send("Not able to Get all blogs")
          }
          
          // if(req.user)
          // {
      
          //   const {id:loggedUserId}= req.user;
          //   const allBlogsjson = allBlogsData.map((blog: { toJSON: () => any; })=>blog.toJSON());
          //   const updatedBlogsData= allBlogsjson.map()
      
          //   res.json({updatedBlogs});
      
          // }
          // else{
          //   res.json({ allBlogsData });
          // }
        
      };
    createBlog = async (req: Request, res: Response) => {
        const { tags, ...blogdata } = req.body;
        blogdata.userId = req.user?.id;
        const inputs = {tags,blogdata};

        try {
          res.json(await this.blogService.createBlog(inputs))
        } catch (error) {
          res.status(500).send("Not able to create Blog");
        }
      
      };

      updateBlog = async (req: Request, res: Response) => {
        const BlogId = req.params.id;
        const loggedUser = req.user as Record<string, any>;
        const { id: loggedUserid } = loggedUser;
        let {title, description}= req.body;
        const inputs = {BlogId,loggedUserid, title,description};
        // only want to change title and description till now
      try {
        
      
        res.json(await this.blogService.updateBlog(inputs));
      } catch (error) {
        res.status(500).send("Not able to update The Blog")
      }
      };

      likeBlog = async (req: Request, res: Response) => {
        const blogId = req.params.blogId;
        const { liked } = req.body;
        const loggedUser = req.user as Record<string, any>;
        const { id: loggedUserId } = loggedUser;
        const inputs = {blogId, liked,loggedUserId};
        try {
          
          const blogExists = await this.blogService.ifBlogExists(+blogId);
          const obj = {
            userId: +loggedUserId,
            blogId: +blogId,
          };
          
          if (blogExists && liked) {
            if (await Likes.findOne({ where: obj })) {
              res.status(400).json("Blog already liked");
              return;
            }
            try {
              await this.likeService.createLike(obj);
              const oldLikes = blogExists.likes;
            await blogExists.update({ likes: oldLikes + 1 });
            res.status(200).json("Blog liked Succesfully");
            } catch (error) {
              res.json("Not able to Like Blog")
            }
          } else if (blogExists && !liked) {
            if (await Likes.findOne({ where: obj })) {
              try {
                const deletedRow = await this.likeService.destroyIfBlogIdUserId({blogId,loggedUserId})
                
                if (deletedRow) {
                  const oldLikes = blogExists.likes;
                  await blogExists.update({ likes: oldLikes - 1 });
                  res.status(200).json("Blog disliked Succesfully");
                }
              } catch (error) {
                console.log(error);
                res.status(500).send("Internal server Error")
              }
            } else {
              res.status(400).json("You cannot dislike the blog");
              return;
            }
          }
        } catch (error) {
          console.log(error);
          res.status(500).json("Not able to perform the Action");
        }
      };

    deleteBlog = async (req: Request, res: Response) => {
        const BlogId = req.params.id;
        const loggedUserId = req.user?.id;
        const inputs = {BlogId,loggedUserId};
        try {

          res.json(await this.blogService.deleteBlog(inputs))
        } catch (error) {
          res.status(500).send("Not able to delete Blog")
        }
      };
      

    }








