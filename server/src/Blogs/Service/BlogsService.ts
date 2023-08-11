import { Request, Response } from "express";
import Blogs from "../../db/models/blogs";
import User from "../../db/models/user";
import Comments from "../../db/models/comments";
import Likes from "../../db/models/likes";
import filter from "../Dto/filterDto"
import { postTagsService } from "../../Tags/Services/tagsService";
import { Op } from "sequelize";
import Tags from "../../db/models/tags";
import { error } from "console";

const ifBlogExists = async (id: number) => {
  const blogExists = await Blogs.findByPk(id);
  return blogExists;
};

const ifUserExists = async (id: number) => {
  const userExists = User.findByPk(id);
  return userExists;
};

export const getAllBlogs = async (req: Request, res: Response) => {
  // get all blogs for all user
  // console.log("blogs associations", Blogs.associations)
  try {
    const { userId, blogId, items, page, sort,tags} = req.query;

    let filter:any={};
    if(userId)
    {
      filter.userId= userId
    }
    if(blogId)
    {
      filter.id=blogId
    }
    console.log(typeof tags)
    let tagsFilter = tags?(tags):null
    console.log("tagsFilter", tagsFilter)
    // if(tagsFilter)
    // [
    //   filter = {'$blogTags.tag$':{[Op.in]:tagsFilter}}
    // ]


    const sortBy = "createdAt";
    const sortOrder = sort ? sort : ("DESC" as any);

    const offset = page && items ? (+page - 1) * +items : 0;
    const allBlogsData: Record<string, any> = await Blogs.findAll({
      
      include: [
        {
          model: User,
          as: "likedUsers",             
          attributes: ["id", "email"],
          through: { attributes: [] },
        },
        {
          model: Comments,
          as: "CommentsOnBLog",
          required:false, // left join because i want all blogs 
          where:{
            parentId: null  // select those whose parent is NULL 
          },
          include:[
            {
              model:Comments,
              as:'replies',
              attributes :['id','userId','comment']
            }
          ],
          attributes: ["id","userId", "comment"],
        },
        {
          model: Tags,
          as:'blogTags',
          required: tags?true: false, // if tags are present then inner join else outer join 
          where: tags ? { tag: { [Op.in]: tagsFilter } } : {},
          attributes :["id", "tag"],
          through:{attributes:[]}
        }
      ],
      where: filter,
      limit: page && items ? +items : 5,
      offset: offset,
      order: [[sortBy, sortOrder]],
    });
    res.json({ allBlogsData });
    // if(req.user)
    // {

    //   const {id:loggedUserId}= req.user;
    //
    //   const updatedBlogs =Object.values(allBlogsData).forEach((blog:Record<string,any>) => {
    //     const idExists: Boolean = blog.likedUsers.some((user:Record<string,any>) => user.id === loggedUserId);
    //     Object.assign(blog, {liked:idExists})
    //     return blog;
    //   });
    //
    //   res.json({updatedBlogs});

    // }
    // else{
    //   res.json({ allBlogsData });
    // }
  } catch (error) {
    console.log("error in getting Blog", error);
    res.status(500).json({ error: "Failed to get blog" });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const {tags,...blogdata} = req.body;
  blogdata.userId = req.user?.id;

  try {
    const createdBlog = await Blogs.create(blogdata);
    if(createdBlog && tags)
    {
      try {
        if(await postTagsService(blogdata.userId, createdBlog.id,tags))
        {
          res.status(201).json({message: "Blog created Succesfully"});
        }
        else{
          throw new Error ("Blog not posted")
        }
      } catch (error) {
        console.log(error)
        
      }
    }

    
  } catch (error) {
    console.log("error in creating blog", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const BlogId = req.params.id;
  const loggedUser = req.user as Record<string, any>;
  const { id: loggedUserid } = loggedUser;
  // only want to change title and description till now
  try {
    const blogExists = await Blogs.findByPk(BlogId);
    if (blogExists) {
      let { title, description } = req.body;
      if ((title || description) && blogExists.userId !== loggedUserid) {
        throw new Error("You are not allowed not update this blog");
      } else {
        await blogExists.update({ title, description });
        res.json({ message: "Blog updated succesfully" });
      }
    }
  } catch (error) {
    console.log("error in updating ", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const likeBlog = async (req: Request, res: Response) => {
  const blogId = req.params.blogId;

  const { liked } = req.body;

  const loggedUser = req.user as Record<string, any>;
  const { id: loggedUserId } = loggedUser;
  try {
    const blogExists = await ifBlogExists(+blogId);
    const obj = {
      userId: +loggedUserId,
      blogId: +blogId,
    };
    if (blogExists && liked) {
      if (await Likes.findOne({ where: obj })) {
        res.status(400).json("Blog already liked");
        return;
      }
      await Likes.create(obj);
      const oldLikes = blogExists.likes;
      await blogExists.update({ likes: oldLikes + 1 });
      res.status(200).json("Blog liked Succesfully");
    } else if (blogExists && !liked) {
      if (await Likes.findOne({ where: obj })) {
        const deletedRow = await Likes.destroy({
          where: {
            [Op.and]: [{ blogId: blogExists.id }, { userId: loggedUserId }],
          },
        });
        const oldLikes = blogExists.likes;
        if (deletedRow) {
          await blogExists.update({ likes: oldLikes - 1 });
          res.status(200).json("Blog disliked Succesfully");
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

export const deleteBlog = async (req: Request, res: Response) => {
  const BlogId = req.params.id;
  const loggedUserId = req.user?.id;
  try {
    const blogExists = await Blogs.findByPk(BlogId);
    if (blogExists && blogExists.userId === loggedUserId) {
      await blogExists.destroy();
      res.json({ message: "Blog has been deleted succesfully" });
    } else {
      throw new Error("You are not allowed to delete this blog");
    }
  } catch (error) {
    console.log("error in deleting ", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

