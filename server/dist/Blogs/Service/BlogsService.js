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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.likeBlog = exports.updateBlog = exports.createBlog = exports.getAllBlogs = void 0;
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const user_1 = __importDefault(require("../../db/models/user"));
const comments_1 = __importDefault(require("../../db/models/comments"));
const likes_1 = __importDefault(require("../../db/models/likes"));
const tagsService_1 = require("../../Tags/Services/tagsService");
const sequelize_1 = require("sequelize");
const tags_1 = __importDefault(require("../../db/models/tags"));
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
    // console.log("blogs associations", Blogs.associations)
    try {
        const { userId, blogId, items, page, sort, tags } = req.query;
        let filter = {};
        if (userId) {
            filter.userId = userId;
        }
        if (blogId) {
            filter.id = blogId;
        }
        console.log(typeof tags);
        let tagsFilter = tags ? (tags) : null;
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
                    as: "CommentsOnBLog",
                    required: false,
                    where: {
                        parentId: null // select those whose parent is NULL 
                    },
                    include: [
                        {
                            model: comments_1.default,
                            as: 'replies',
                            attributes: ['id', 'userId', 'comment']
                        }
                    ],
                    attributes: ["id", "userId", "comment"],
                },
                {
                    model: tags_1.default,
                    as: 'blogTags',
                    required: tags ? true : false,
                    where: tags ? { tag: { [sequelize_1.Op.in]: tagsFilter } } : {},
                    attributes: ["id", "tag"],
                    through: { attributes: [] }
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
    }
    catch (error) {
        console.log("error in getting Blog", error);
        res.status(500).json({ error: "Failed to get blog" });
    }
});
exports.getAllBlogs = getAllBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { tags } = _b, blogdata = __rest(_b, ["tags"]);
    blogdata.userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const createdBlog = yield blogs_1.default.create(blogdata);
        if (createdBlog && tags) {
            try {
                if (yield (0, tagsService_1.postTagsService)(blogdata.userId, createdBlog.id, tags)) {
                    res.status(201).json({ message: "Blog created Succesfully" });
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
    var _c;
    const BlogId = req.params.id;
    const loggedUserId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
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