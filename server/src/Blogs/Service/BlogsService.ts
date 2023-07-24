import { Request, Response } from "express"
import Blogs from "../../db/models/blogs";
import { spec } from "node:test/reporters";




export const  getAllBlogs= async (req: Request,  res: Response)=>
{
   // get all blogs for all user 
   try {
      const {userId}= req.query;
      console.log("req.oarams are", req.query);
      console.log("userId is", userId);
      const filter = userId? {userId}: {} as any;
      const allBlogData= await Blogs.findAndCountAll({where:filter});
      console.log("all blog data", allBlogData);
      const {rows ,count}= allBlogData;
      res.json({rows,count})
   } catch (error) {
      console.log("error in getting Blog", error);
      res.status(500).json({ error: 'Failed to get blog' });

   }
}

export const  createBlog= async (req: Request,  res: Response)=>
{
   const blogdata= req.body;
   blogdata.userId= req.user?.id; 
   
   try {
      const createdBlog =await Blogs.create(blogdata);
      console.log("blog created with blog id is ", createdBlog.id);
      return res.status(201).json(createBlog);
   } catch (error) {
      console.log("error in creating blog", error);
      res.status(500).json({ error: 'Failed to create blog' });
   }
 
}

export const  updateBlog= async (req: Request,  res: Response)=>
{
  const BlogId= req.params.id;
  const loggedUser =req.user as Record<string,any>;
  const {id:loggedUserid}= loggedUser;
  // only want to change title and description till now
  try {
   const blogExists = await Blogs.findByPk(BlogId);
   if(blogExists)
   {
      let {title, description , like} = req.body; 
      if(title || description && blogExists.id!==loggedUserid)
      {
         throw new Error ("You are not allowed npt update this blog");
      }
      else{
         let oldLikes= blogExists.likes;
         if(like)
         {
          like= oldLikes+like;
         }
         await blogExists.update({title,description,likes:like});
         res.json({message: "Blog updated succesfully"})
      }
     
   }
  } catch (error) {
   console.log("error in updating ",error);
   res.status(500).json({ error: 'Failed to update blog' });
  }
}

export const deleteBlog= async (req: Request,  res: Response)=>
{
   const BlogId= req.params.id;
   const {id:loggedUserId}= req.user?.id;
  try {
   const blogExists = await Blogs.findByPk(BlogId);
   if(blogExists && blogExists.id===loggedUserId)
   {
       await blogExists.destroy();
      res.json({message:"Blog has been deleted succesfully"  });
   }
   else{
      throw new Error("You are not allowed to delete this blog");
   }
  } catch (error) {
   console.log("error in deleting ",error);
   res.status(500).json({ error: 'Failed to delete blog' });
  }
}

