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
exports.deleteBlog = exports.likeBlog = exports.updateBlog = exports.createBlog = exports.getAllBlogs = void 0;
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const user_1 = __importDefault(require("../../db/models/user"));
const likes_1 = __importDefault(require("../../db/models/likes"));
const sequelize_1 = require("sequelize");
const ifBlogExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogExists = yield blogs_1.default.findByPk(id);
    return blogExists;
});
const ifUserExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = user_1.default.findByPk(id);
    return userExists;
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all blogs for all user
    try {
        const { userId, blogId, items, page, sort } = req.query;
        const filter = userId
            ? blogId
                ? { userId, id: blogId }
                : { userId }
            : blogId
                ? { id: blogId }
                : {};
        const sortBy = "createdAt";
        const sortOrder = sort ? sort : "DESC";
        const offset = page && items ? (+page - 1) * +items : 0;
        const allBlogsData = yield blogs_1.default.findAll({
            where: filter,
            include: [
                {
                    model: user_1.default,
                    as: "likedUsers",
                    attributes: ["id", "email"],
                    through: { attributes: [] },
                },
            ],
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
    }
    catch (error) {
        console.log("error in getting Blog", error);
        res.status(500).json({ error: "Failed to get blog" });
    }
});
exports.getAllBlogs = getAllBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogdata = req.body;
    blogdata.userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const createdBlog = yield blogs_1.default.create(blogdata);
        console.log("blog created with blog id is ", createdBlog.id);
        return res.status(201).json(createdBlog);
    }
    catch (error) {
        console.log("error in creating blog", error);
        res.status(500).json({ error: "Failed to create blog" });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BlogId = req.params.id;
    const loggedUser = req.user;
    const { id: loggedUserid } = loggedUser;
    // only want to change title and description till now
    try {
        const blogExists = yield blogs_1.default.findByPk(BlogId);
        if (blogExists) {
            let { title, description } = req.body;
            if ((title || description) && blogExists.userId !== loggedUserid) {
                throw new Error("You are not allowed not update this blog");
            }
            else {
                yield blogExists.update({ title, description });
                res.json({ message: "Blog updated succesfully" });
            }
        }
    }
    catch (error) {
        console.log("error in updating ", error);
        res.status(500).json({ error: "Failed to update blog" });
    }
});
exports.updateBlog = updateBlog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const { liked } = req.body;
    const loggedUser = req.user;
    const { id: loggedUserId } = loggedUser;
    try {
        const blogExists = yield ifBlogExists(+blogId);
        const obj = {
            userId: +loggedUserId,
            blogId: +blogId,
        };
        if (blogExists && liked) {
            if (yield likes_1.default.findOne({ where: obj })) {
                res.status(400).json("Blog already liked");
                return;
            }
            yield likes_1.default.create(obj);
            const oldLikes = blogExists.likes;
            yield blogExists.update({ likes: oldLikes + 1 });
            res.status(200).json("Blog liked Succesfully");
        }
        else if (blogExists && !liked) {
            if (yield likes_1.default.findOne({ where: obj })) {
                const deletedRow = yield likes_1.default.destroy({
                    where: {
                        [sequelize_1.Op.and]: [{ blogId: blogExists.id }, { userId: loggedUserId }],
                    },
                });
                const oldLikes = blogExists.likes;
                if (deletedRow) {
                    yield blogExists.update({ likes: oldLikes - 1 });
                    res.status(200).json("Blog disliked Succesfully");
                }
            }
            else {
                res.status(400).json("You cannot dislike the blog");
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Not able to perform the Action");
    }
});
exports.likeBlog = likeBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const BlogId = req.params.id;
    const loggedUserId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const blogExists = yield blogs_1.default.findByPk(BlogId);
        if (blogExists && blogExists.userId === loggedUserId) {
            yield blogExists.destroy();
            res.json({ message: "Blog has been deleted succesfully" });
        }
        else {
            throw new Error("You are not allowed to delete this blog");
        }
    }
    catch (error) {
        console.log("error in deleting ", error);
        res.status(500).json({ error: "Failed to delete blog" });
    }
});
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=BlogsService.js.map