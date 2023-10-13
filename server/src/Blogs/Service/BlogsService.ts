import User from "../../db/models/user"
import Comments from "../../db/models/comments"
import Blogs from "../../db/models/blogs";
import Tags from "../../db/models/tags"
import { Op } from "sequelize";
import { postTagsService } from "../../Tags/Services/tagsService";
import BlogContract from "../Repositories/BlogRepositories"
export default class BlogsService implements BlogContract
{
  
    ifBlogExists = async (id: number) => {
        const blogExists = await Blogs.findByPk(id);
        return blogExists;
      };

    getAllBlog =async (inputs:Record<string,any>) => {
        try {
            const { userId, blogId, items,  sort, tags } = inputs;
            let {page=1} = inputs

            page = Math.max(page,1);
            let filter: any = {};
            if (userId) {
              filter.userId = userId;
            }
            if (blogId) {
              filter.id = blogId;
            }
            
            let tagsFilter = tags ? tags : null;
           
            // if(tagsFilter)
            // [
            //   filter = {'$blogTags.tag$':{[Op.in]:tagsFilter}}
            // ]
        
            const sortBy = "createdAt";
            const sortOrder = sort ? sort : ("DESC" as any);
        
            const offset = page && items ? (+page - 1) * +items : 0;

            console.log("page is ", page);
            console.log("offset is ", offset);

            const allBlogsData: Record<string, any> = await Blogs.findAll({
              include: [
                {
                  model: User,
                  as: "likedUsers",
                  attributes: ["id", "email"],
                  through: { attributes: [] },
                },
                {
                  model:User,
                  as:"user",
                  attributes:["name"]
                },
                {
                  model: Comments,
                  as: "CommentsOnBlog",
                  required: false, // left join because i want all blogs
                  where: {
                    parentId: null, // select those whose parent is NULL
                  },
                  include: [
                    {
                      model: Comments,
                      as: "replies",
                      attributes: ["id", "userId", "comment"],
                    },
                  ],
                  attributes: ["id", "userId", "comment"],
                },
                {
                  model: Tags,
                  as: "blogTags",
                  required: tags ? true : false, // if tags are present then inner join else outer join
                  where: tags ? { tag: { [Op.in]: tagsFilter } } : {},
                  attributes: ["id", "tag"],
                  through: { attributes: [] },
                },
              ],
              where: filter,
              limit: page && items ? +items :5,
              offset: offset,
              order: [[sortBy, sortOrder]],
            });
          
            return allBlogsData;
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
          } catch (error) {
            console.log(error)
            throw new Error("Not able to get Blogs")
          }
        
    }

     createBlog =async (inputs:Record<string,any>) => {
        const {tags, blogdata}= inputs
        try {
            const createdBlog = await Blogs.create(blogdata);
            if (createdBlog && tags) {
              try {
                if (await postTagsService(blogdata.userId, createdBlog.id, tags)) {
                  return createdBlog.dataValues;
                } else {
                  throw new Error("Blog not posted");
                }
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            console.log("error in creating blog", error);
            throw new Error("Not able to create Blog")
            
          }
        
    }

    updateBlog =async (inputs:Record<string,any>) => {
        const {BlogId,title,description,loggedUserid}= inputs;
        try {
            const blogExists = await Blogs.findByPk(BlogId);
            if (blogExists) {
              
              if ((title || description) && blogExists.userId !== loggedUserid) {
                throw new Error("You are not allowed not update this blog");
              } else {
                await blogExists.update({ title, description });
                return {resp: "Blog Updated Succesfully"}
              }
            }
          } catch (error) {
            console.log("error in updating ", error);
            throw new Error ("Not able to update the Blog")
          }
        
    }
    deleteBlog =async (inputs:Record<string,any>) => {
        const {BlogId,loggedUserId}= inputs;
        try {
            const blogExists = await Blogs.findByPk(BlogId);
            console.log("hello");
            if (blogExists && blogExists.userId === loggedUserId) {
              await blogExists.destroy();
              return  { resp:"Blog deleted Succesfully"}
            } else {
            
              throw new Error("You are not allowed to delete this blog");
            }
          } catch (error) {
            console.log("error in deleting ", error);
            return  new Error ("Not able to delete Blog")
           
            
          }
        
    }
}