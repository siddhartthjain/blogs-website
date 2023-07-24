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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getAllBlogs = void 0;
const blogs_1 = __importDefault(require("../../db/models/blogs"));
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all blogs for all user 
    try {
        const { userId } = req.query;
        console.log("req.oarams are", req.query);
        console.log("userId is", userId);
        const filter = userId ? { userId } : {};
        const allBlogData = yield blogs_1.default.findAndCountAll({ where: filter });
        console.log("all blog data", allBlogData);
        const { rows, count } = allBlogData;
        res.json({ rows, count });
    }
    catch (error) {
        console.log("error in getting Blog", error);
        res.status(500).json({ error: 'Failed to get blog' });
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
        return res.status(201).json(exports.createBlog);
    }
    catch (error) {
        console.log("error in creating blog", error);
        res.status(500).json({ error: 'Failed to create blog' });
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
            let { title, description, like } = req.body;
            if (title || description && blogExists.id !== loggedUserid) {
                throw new Error("You are not allowed npt update this blog");
            }
            else {
                let oldLikes = blogExists.likes;
                if (like) {
                    like = oldLikes + like;
                }
                yield blogExists.update({ title, description, likes: like });
                res.json({ message: "Blog updated succesfully" });
            }
        }
    }
    catch (error) {
        console.log("error in updating ", error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const BlogId = req.params.id;
    const { id: loggedUserId } = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const blogExists = yield blogs_1.default.findByPk(BlogId);
        if (blogExists && blogExists.id === loggedUserId) {
            yield blogExists.destroy();
            res.json({ message: "Blog has been deleted succesfully" });
        }
        else {
            throw new Error("You are not allowed to delete this blog");
        }
    }
    catch (error) {
        console.log("error in deleting ", error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=BlogsService.js.map