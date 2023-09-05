"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../db/models/user"));
const comments_1 = __importDefault(require("../../db/models/comments"));
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const tags_1 = __importDefault(require("../../db/models/tags"));
const sequelize_1 = require("sequelize");
const tagsService_1 = require("../../Tags/Services/tagsService");
class BlogsService {
    constructor() {
        this.ifBlogExists = (id) => __awaiter(this, void 0, void 0, function* () {
            const blogExists = yield blogs_1.default.findByPk(id);
            return blogExists;
        });
        this.getAllBlog = (inputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, blogId, items, page, sort, tags } = inputs;
                let filter = {};
                if (userId) {
                    filter.userId = userId;
                }
                if (blogId) {
                    filter.id = blogId;
                }
                console.log(typeof tags);
                let tagsFilter = tags ? tags : null;
                console.log("tagsFilter", tagsFilter);
                // if(tagsFilter)
                // [
                //   filter = {'$blogTags.tag$':{[Op.in]:tagsFilter}}
                // ]
                const sortBy = "createdAt";
                const sortOrder = sort ? sort : "DESC";
                const offset = page && items ? (+page - 1) * +items : 0;
                const allBlogsData = yield blogs_1.default.findAll({
                    include: [
                        {
                            model: user_1.default,
                            as: "likedUsers",
                            attributes: ["id", "email"],
                            through: { attributes: [] },
                        },
                        {
                            model: comments_1.default,
                            as: "CommentsOnBlog",
                            required: false,
                            where: {
                                parentId: null, // select those whose parent is NULL
                            },
                            include: [
                                {
                                    model: comments_1.default,
                                    as: "replies",
                                    attributes: ["id", "userId", "comment"],
                                },
                            ],
                            attributes: ["id", "userId", "comment"],
                        },
                        {
                            model: tags_1.default,
                            as: "blogTags",
                            required: tags ? true : false,
                            where: tags ? { tag: { [sequelize_1.Op.in]: tagsFilter } } : {},
                            attributes: ["id", "tag"],
                            through: { attributes: [] },
                        },
                    ],
                    where: filter,
                    limit: page && items ? +items : 5,
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
            }
            catch (error) {
                console.log(error);
                throw new Error("Not able to get Blogs");
            }
        });
        this.createBlog = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { tags, blogdata } = inputs;
            try {
                const createdBlog = yield blogs_1.default.create(blogdata);
                if (createdBlog && tags) {
                    try {
                        if (yield (0, tagsService_1.postTagsService)(blogdata.userId, createdBlog.id, tags)) {
                            return createdBlog;
                        }
                        else {
                            throw new Error("Blog not posted");
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            catch (error) {
                console.log("error in creating blog", error);
                throw new Error("Not able to create Blog");
            }
        });
        this.updateBlog = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { BlogId, title, description, loggedUserid } = inputs;
            try {
                const blogExists = yield blogs_1.default.findByPk(BlogId);
                if (blogExists) {
                    if ((title || description) && blogExists.userId !== loggedUserid) {
                        throw new Error("You are not allowed not update this blog");
                    }
                    else {
                        yield blogExists.update({ title, description });
                        return "Blog updated Succesfully";
                    }
                }
            }
            catch (error) {
                console.log("error in updating ", error);
                throw new Error("Not able to update the Blog");
            }
        });
        this.deleteBlog = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const { BlogId, loggedUserId } = inputs;
            try {
                const blogExists = yield blogs_1.default.findByPk(BlogId);
                if (blogExists && blogExists.userId === loggedUserId) {
                    yield blogExists.destroy();
                    return "Blog deleted Succesfully";
                }
                else {
                    throw new Error("You are not allowed to delete this blog");
                }
            }
            catch (error) {
                console.log("error in deleting ", error);
                throw new Error("Not able to delete Blog");
            }
        });
    }
}
exports.default = BlogsService;
//# sourceMappingURL=BlogsService.js.map