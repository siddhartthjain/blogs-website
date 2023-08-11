import { Request, Response } from "express";
import Blogs from "../../db/models/blogs";
import Tags from "../../db/models/tags";
import BlogTags from "../../db/models/blogTags";

export const postTagsService = async (
  loggedUserId: number,
  blogId: number,
  tags: any
) => {
  const blog = await Blogs.findByPk(blogId);
  try {
    if (blog && loggedUserId === blog?.userId) {
      tags.map(async (tag: string) => {
        const existingTag = await Tags.findOne({ where: { tag: tag } });
        console.log(existingTag);
        if (!existingTag) {
          const createdTag = await Tags.create({ tag: tag });
          const createdTagId = createdTag.id;
          BlogTags.create({ blogId: +blogId, tagId: createdTagId });
        } else {
          await BlogTags.create({ blogId: +blogId, tagId: existingTag.id });
        }
      });
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return;
};
export const postTags = async (req: Request, res: Response) => {
  const loggedUserId = req.user?.id;
  const { id: blogId } = req.params;

  const { tags } = req.body;
  const blog = await Blogs.findByPk(blogId);

  if (await postTagsService(loggedUserId, +blogId, tags)) 
  {
    
    res.status(200).json({ message: "tags have been posted succesfully" });
    return;
  } else {
    res.status(400).json({ error: "Not able to post Tags" });
    return;
  }
};
